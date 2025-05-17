import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer.js';
import { useDispatch, useSelector } from "react-redux";
import { wsConnecting, wsError, wsMessage, wsOpen, wsClose} from './feed/feed-slice.ts';
import { wsHistoryError, wsHistoryMessage, wsHistoryOpen, wsHistoryClose} from './history/history-slice.ts';
import { wsConnect, wsDisconnect } from './feed/actions.ts';
import { wsHistoryConnect, wsHistoryDisconnect } from './history/actions.ts';
import { socketMiddleware } from './socketMiddleware.ts';


const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onError: wsError,
  onMessage: wsMessage,
  onOpen: wsOpen,
  onClose: wsClose,
  onConnecting: wsConnecting,
})

const historydMiddleware = socketMiddleware({
  connect: wsHistoryConnect,
  disconnect: wsHistoryDisconnect,
  onError: wsHistoryError,
  onMessage: wsHistoryMessage,
  onOpen: wsHistoryOpen,
  onClose: wsHistoryClose,
  onConnecting: wsConnecting,
})

export const store = configureStore({
  reducer: rootReducer, 
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(feedMiddleware, historydMiddleware),
  devTools: true
}) 

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();