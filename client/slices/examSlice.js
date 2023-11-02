import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  days: [],
  content: "",
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
    setContent: (state, action) => {
      state.content = action.payload;
    },
    resetValues: (state) => {
      state.date = "";
      state.days = [];
      state.content = "";
    },
  },
});

export const getDate = (state) => state.exam.date;
export const getDays = (state) => state.exam.days;
export const getContent = (state) => state.exam.content;

export const { setDate, setDays, resetValues, setContent } = examSlice.actions;
export default examSlice.reducer;
