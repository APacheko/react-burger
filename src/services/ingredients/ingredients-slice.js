import { getIngredientsApi } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getIngredientsThunk = createAsyncThunk(
  "ingredints/getIngredients",
  async () => await getIngredientsApi()
);

export const initialState = {
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
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error?.message;
        state.loading = false;
      })
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { getIngredients } = ingredientsSlice.selectors;
