import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  days: [],
  content: "",
  uploaded: false,
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
    setUploaded: (state, action) => {
      state.uploaded = action.payload;
    },
    resetValues: (state) => {
      state.date = "";
      state.days = [];
      state.content = "";
      state.uploaded = false;
    },
  },
});

export const getDate = (state) => state.exam.date;
export const getDays = (state) => state.exam.days;
export const getContent = (state) => state.exam.content;
export const getUploaded = (state) => state.exam.uploaded;

export const { setDate, setDays, resetValues, setContent, setUploaded } =
  examSlice.actions;
export default examSlice.reducer;
