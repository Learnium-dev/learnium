import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlashCards } from "../src/services/flashcardsService";
import { updateDetails } from "../src/services/detailsService";

const initialState = {
  cards: [],
  termFirst: true,
  practicing: false,
  cardIndex: 0
};

export const fetchFlashcards = createAsyncThunk('fetchFlashcards', async (keyTopicId) => {
  console.log('Loading flashcards from state')
  const response = await getFlashCards(keyTopicId);
  return response[0].details;
});

export const updateFlashcard = createAsyncThunk('updateFlashcard', async (card) => {
  console.log('Updating flashcard from state', card)
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
    .addCase(updateFlashcard.fulfilled, (state, action) => {
      const updatedCard = action.payload;
      state.cards[state.cardIndex] = updatedCard;
    })
  },
});

export default flashCardsSlice;

