import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../slices/dummySlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
