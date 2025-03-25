import type {
  Middleware,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TWsConnect } from "../utils/type";
import { refreshToken } from "../utils/api";

export type TWsActionsType<R, S> = {
  connect: ActionCreatorWithPayload<TWsConnect>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

export const socketMiddleware = <R, S>(
  wsActions: TWsActionsType<R, S>,
  withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onConnecting,
      onOpen,
      onClose,
      onMessage,
      onError,
    } = wsActions;

    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        if (socket) {
          return;
        }
        const { url, token }: TWsConnect = action.payload;
        socket = token
          ? new WebSocket(`${url}?token=${token}`)
          : new WebSocket(`${url}`);
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("WebSocket error"));
        };

        socket.onclose = () => {
          onClose && dispatch(onClose());
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, token }));
            }, 3000);
          }
        };
        socket.onmessage = (event: MessageEvent<string>): void => {
          const { data } = event;
          try {
            const parsedData = JSON.parse(data);
            if (
              withTokenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              refreshToken()
                .then((data) => {
                  const Url = new URL(url);
                  const token = data.accessToken.replace("Bearer ", "");
                  Url.searchParams.set("token", token);
                  dispatch(connect({ url: Url.toString(), token }));
                })
                .catch((error: unknown) => {
                  dispatch(onError((error as { message: string }).message));
                });

              dispatch(disconnect());
              return;
            }
            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };
      }
      
      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as Error).message));
        }
      }
      if (socket && disconnect?.match(action)) {
        if (socket !== null) {
          socket.close();
        }
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket = null;
      }
      next(action);
    };
  };
};
