import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/type";

interface IinitialState {
  connected: boolean;
  orders: IOrder[] | null;
  error: string | null;
}

interface IWsResponse {
  success: boolean;
  orders: IOrder[];
}

const initialState: IinitialState = {
  connected: false,
  orders: null,
  error: null,
};

export const historySlice = createSlice({
  name: "getHistory",
  initialState,
  reducers: {
    wsHistoryConnecting: (state) => {
      state.connected = true;
    },
    wsHistoryDisconnect(state) {
      state.connected = false;
    },
    wsHistoryOpen: (state) => {
      state.connected = true;
      state.error = null;
    },
    wsHistoryClose: (state) => {
      state.connected = false;
    },
    wsHistoryMessage: (state, action: PayloadAction<IWsResponse>) => {
      state.orders = action.payload.orders;

    },
    wsHistoryError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    getHistory: (state) => state.orders,

  },
});

export const {
  wsHistoryConnecting,
  wsHistoryDisconnect,
  wsHistoryClose,
  wsHistoryError,
  wsHistoryMessage,
  wsHistoryOpen,
} = historySlice.actions;

export const { getHistory,} = historySlice.selectors;
