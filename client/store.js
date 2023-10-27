import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/dummySlice";
import { credentialSlice } from "./slices/credentialsSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    credentials: credentialSlice.reducer,
  },
});
