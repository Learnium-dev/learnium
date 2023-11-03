import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRef, useState, useEffect } from "react";
import PagerView from "react-native-pager-view";
import FlashCard from "../components/FlashCard";
import { getFlashCards } from "../services/flashcardsService";
import FlashCardsSetupView from "../layout/FlashCardsSetupView";
import { updateDetails } from "../services/detailsService";
import FlashCardsQuizHeader from "../components/FlashCardsQuizHeader";
import { useDispatch, useSelector } from 'react-redux'
import flashCardsSlice, { fetchFlashcards, updateFlashcard, fetchMaterialFlashcards } from "../../slices/flashCardsSlice";

const FlashCardsContainer = ({ closeSheet, keyTopic, studyMaterial }) => {
  const dispatch = useDispatch();
  const pagerRef = useRef(null);

  // Selectors
  const cards = useSelector(state => state.flashCards.cards);
  const termFirst = useSelector(state => state.flashCards.termFirst);
  const practicing = useSelector(state => state.flashCards.practicing);
  const cardIndex = useSelector(state => state.flashCards.cardIndex);

  // Actions
  const { setTermFirst, setPracticing, setCardIndex } = flashCardsSlice.actions;


  useEffect(() => {
    if (studyMaterial) {
      dispatch(fetchMaterialFlashcards(keyTopic.folderid._id))
    } else {
      dispatch(fetchFlashcards(keyTopic._id));
    }
    dispatch(setPracticing(false));
  }, [dispatch]);

  const handleStart = (termFirst) => {
    dispatch(setTermFirst(termFirst));
    dispatch(setPracticing(true));
  };

  const markDifficult = (card) => {
    updatedCard = {...card, isdone: !card.isdone};
    dispatch(updateFlashcard(updatedCard));
  };

  const handleClose = () => {
    dispatch(setPracticing(false));
    dispatch(setCardIndex(0));
    closeSheet();
  }

  return (
    <View style={styles.container}>
      <FlashCardsQuizHeader
        closeSheet={handleClose}
        isQuizTrue={false}
      />

      {practicing ?
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          scrollEnabled={true}
          overdrag={true}
          ref={pagerRef}
          onPageSelected={(e) => dispatch(setCardIndex(e.nativeEvent.position))}
        >
          {cards.length &&
            cards.map((card, index) => {
              return (
                <FlashCard
                  card={card}
                  index={index}
                  key={index}
                  termFirst={termFirst}
                  markDifficult={markDifficult}
                />
              );
            })}
        </PagerView>
      :
        <FlashCardsSetupView
          onStartPracticing={handleStart}
          keyTopic={keyTopic}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default FlashCardsContainer;
