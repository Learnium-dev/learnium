import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  days: [],
};

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    resetValues: (state) => {
      state.date = "";
      state.days = [];
    },
  },
});

export const getDate = (state) => state.exam.date;
export const getDays = (state) => state.exam.days;

export const { setDate, setDays, resetValues } = examSlice.actions;
export default examSlice.reducer;
