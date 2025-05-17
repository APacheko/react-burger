import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/api";
import { IOrder } from "../../utils/type";

interface IinitialState {
  order: IOrder | null;
  isOpenModal: boolean;
  loading: boolean
  error: string | null,
}

export const initialState: IinitialState = {
  order: null,
  isOpenModal: false,
  loading: false,
  error: null,
};

export const postOrderThunk = createAsyncThunk("order/getOrder", postOrder);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    deleteOrderData: (state) => {
      state.order = null;
      state.isOpenModal = false;
    },
  },
  selectors: {
    getOrderData: (state) => state,
    getIsOpenModal: (state) => state.isOpenModal,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.loading = false;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.error = String(action.error?.message)
        state.loading = false;
      })
      .addCase(postOrderThunk.pending, (state) => {
        state.loading = true;
        state.isOpenModal = true;
      });
  },
});

export const { getOrderData, getIsOpenModal } = orderSlice.selectors;
export const { deleteOrderData } = orderSlice.actions;
export default orderSlice.reducer;
