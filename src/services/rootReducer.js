import { combineSlices } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/ingredients-slice.js";
import { ingredientsConstructorSlice } from "./constructor/constructor-slice.js";
import { orderSlice } from "./order/order-slice.js";
import { authSlice } from "./auth/auth-slice.js";

export const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientsConstructorSlice,
  orderSlice,
  authSlice,
);
