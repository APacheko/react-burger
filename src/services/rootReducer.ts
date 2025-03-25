import { combineSlices } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/ingredients-slice.ts";
import { ingredientsConstructorSlice } from "./constructor/constructor-slice.ts";
import { orderSlice } from "./order/order-slice.ts";
import { authSlice } from "./auth/auth-slice.ts";
import { feedSlice } from "./feed/feed-slice.ts";
import {historySlice} from "./history/history-slice.ts"

export const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientsConstructorSlice,
  orderSlice,
  authSlice,
  feedSlice,
  historySlice
);
