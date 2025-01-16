import { combineSlices } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/ingredients-slice.js";
import { ingredientDetailsSlice } from "./details/details-slice.js";
import { ingredientsConstructorSlice } from "./constructor/constructor-slice.js";
import { orderSlice } from "./order/order-slice.js";

export const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientDetailsSlice,
  ingredientsConstructorSlice,
  orderSlice
);
