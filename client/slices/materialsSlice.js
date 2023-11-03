import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlashCards } from "../src/services/flashcardsService";
import { getFolder } from "../src/services/foldersService";
import { getKeyTopics } from "../src/services/keyTopicsService";


const initialState = {
  material: undefined,
  keyTopics: [],
  flashCards: [],
};

export const fetchMaterial = createAsyncThunk('fetchMaterial', async (folderid) => {
  const material = await getFolder(folderid);
  console.log('material in material state', material)
  return material;
});

export const fetchKeyTopics = createAsyncThunk('fetchKeyTopics', async () => {
  const keyTopics = await getKeyTopics();
  console.log('keyTopics in material state', keyTopics)
  return keyTopics;
});

export const materialsSlice = createSlice({
name: 'material',
initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMaterial.fulfilled, (state, action) => {
      state.material = action.payload;
    })
    .addCase(fetchKeyTopics.fulfilled, (state, action) => {
      state.keyTopics = action.payload;
    })
  },
});

export default materialsSlice;

