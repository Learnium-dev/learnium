import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/dummySlice";
import { credentialSlice } from "./slices/credentialsSlice";
import { examSlice } from "./slices/examSlice";

export const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    credentials: credentialSlice.reducer,
    exam: examSlice.reducer,
  },
});
