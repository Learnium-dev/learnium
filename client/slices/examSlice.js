import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  days: [],
  content: "",
  uploaded: false,
  pdfName: "",
  folderId: "",
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
    setPDFName: (state, action) => {
      state.pdfName = action.payload;
    },
    setFolderId: (state, action) => {
      state.folderId = action.payload;
    },
    resetValues: (state) => {
      state.date = "";
      state.days = [];
      state.content = "";
      state.uploaded = false;
      state.pdfName = "";
      state.folderId = "";
    },
  },
});

export const getDate = (state) => state.exam.date;
export const getDays = (state) => state.exam.days;
export const getContent = (state) => state.exam.content;
export const getUploaded = (state) => state.exam.uploaded;
export const getPDFName = (state) => state.exam.pdfName;
export const getFolderId = (state) => state.exam.folderId;

export const {
  setDate,
  setDays,
  resetValues,
  setContent,
  setUploaded,
  setPDFName,
  setFolderId,
} = examSlice.actions;
export default examSlice.reducer;
