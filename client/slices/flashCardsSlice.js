import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlashCards, getMaterialFlashCards } from "../src/services/flashcardsService";
import { updateDetails } from "../src/services/detailsService";

const initialState = {
  cards: [],
  termFirst: true,
  practicing: false,
  cardIndex: 0,
  showingInfo: false
};

export const fetchFlashcards = createAsyncThunk('fetchFlashcards', async (keytopicid) => {
  const response = await getFlashCards(keytopicid);
  return response[0].details;
});

export const fetchMaterialFlashcards = createAsyncThunk('fetchMaterialFlashcards', async (folderid) => {
  const response = await getMaterialFlashCards(folderid);
  const allDetails = response.flatMap(card => card.details);
  return allDetails;
});

export const updateFlashcard = createAsyncThunk('updateFlashcard', async (card) => {
  const updatedCard = await updateDetails(card._id, card);
  return updatedCard;
});

export const flashCardsSlice = createSlice({
name: 'flashCards',
initialState,
  reducers: {
    setTermFirst: (state, action) => {
      state.termFirst = action.payload;
    },
    setPracticing: (state, action) => {
      state.practicing = action.payload;
    },
    setCardIndex: (state, action) => {
      state.cardIndex = action.payload;
    },
    updateCardAnswer: (state, action) => {
      const card = state.cards[action.payload.index];
      card.answer = action.payload.answer;
    },
    setShowingInfo: (state, action) => {
      state.showingInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFlashcards.fulfilled, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(fetchFlashcards.rejected, (state, action) => {
      state.cards = [];
    })
    .addCase(fetchMaterialFlashcards.fulfilled, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(updateFlashcard.fulfilled, (state, action) => {
      const updatedCard = action.payload;
      state.cards[state.cardIndex] = updatedCard;
    })
  },
});

export default flashCardsSlice;

