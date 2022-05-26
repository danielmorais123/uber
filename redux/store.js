import { configureStore } from "@reduxjs/toolkit";
import uberReducer from "./uberReducer";

export const store = configureStore({
  reducer: { uberReducer },
});
