import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/api";

export const initialState = {
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
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.error = action.error?.message;
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
