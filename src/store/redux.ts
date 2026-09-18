import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>; //ReturnType<typeof store.getState> helps to automatically derive/extract the type of the strore's state.
export type AppDispatch = typeof store.dispatch;