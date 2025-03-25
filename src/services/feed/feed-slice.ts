import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/type";

interface IinitialState {
  connected: boolean;
  orders: IOrder[] | null;
  total: number;
  totalToday: number;
  error: string | null;
}

interface IWsResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

const initialState: IinitialState = {
  connected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  error: null,
};

export const feedSlice = createSlice({
  name: "getFeed",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.connected = true;
    },
    wsDisconnect(state) {
      state.connected = false;
    },
    wsOpen: (state) => {
      state.connected = true;
      state.error = null;
    },
    wsClose: (state) => {
      state.connected = false;
    },
    wsMessage: (state, action: PayloadAction<IWsResponse>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
  },
});

export const {
  wsConnecting,
  wsDisconnect,
  wsClose,
  wsError,
  wsMessage,
  wsOpen,
} = feedSlice.actions;

export const { getOrders, getTotal, getTotalToday } = feedSlice.selectors;

