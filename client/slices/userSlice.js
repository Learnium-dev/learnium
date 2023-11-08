import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
  },
  reducers: {
      setFirstName: (state, action) => {
          console.log('setFirstName action.payload: ', action.payload);
      state.firstName = action.payload;
    },
  },
});

export const { setFirstName } = userSlice.actions;

export default userSlice.reducer;
