import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  ingredientData: [],
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientData",
  initialState,
  reducers: {
    addIngredientData: (state, action) => {
      state.ingredientData.push(action.payload);
    },
    removeIngredientData: (state) => {
      state.ingredientData = [];
    },
  },
  selectors: {
    getIngredient: (state) => state.ingredientData[0],
  },
});

export const { addIngredientData, removeIngredientData } =
  ingredientDetailsSlice.actions;
export const { getIngredient } = ingredientDetailsSlice.selectors;
