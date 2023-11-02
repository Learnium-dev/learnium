import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
};

export const credentialSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetValues: (state) => {
      state.email = "";
      state.token = "";
    },
  },
});

export const getEmail = (state) => state.credentials.email;
export const getToken = (state) => state.credentials.token;

export const { setEmail, setToken, resetValues } = credentialSlice.actions;
export default credentialSlice.reducer;
