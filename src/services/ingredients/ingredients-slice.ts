import { getIngredientsApi } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIngredientObj } from "../../utils/type";

interface IinitialState {
  ingredients: IIngredientObj[],
  loading: boolean;
  error: string | null;
}

export const getIngredientsThunk = createAsyncThunk(
  "ingredints/getIngredients",
  getIngredientsApi
);

export const initialState: IinitialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = String(action.error?.message)
        state.loading = false;
      })
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { getIngredients } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
