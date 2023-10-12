import { View, Text, StyleSheet, Button } from "react-native";
import { useState, useRef, useMemo, useCallback } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FlashCardsContainer from '../../../containers/FlashCardsContainer';

const dummyCards = [
  {
    answer: "E-commerce, cloud computing, and digital streaming",
    question: "What does Amazon specialize in?",
    difficult: false,
  },
  {
    answer: "Jeff Bezos in 1994",
    question: "Who founded Amazon and when?",
    difficult: false,
  },
  {
    answer: "Bellevue, Washington",
    question: "Where was Amazon founded?",
    difficult: false,
  },
  {
    answer: "Zoox, Amazon Lab126, and Kuiper Systems among others",
    question: "What are some of Amazon’s subsidiaries?",
    difficult: false,
  },
  {
    answer: "Books",
    question: "What was Amazon initially an online marketplace for?",
    difficult: false,
  },
];

const KeyTopic = (props) => {

  const bottomSheetModalRef = useRef(null);

  // height of the bottom sheet modal 95%
  const snapPoints = useMemo(() => ['95%'], []);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  }

  return (

      <View style={styles.container}>
        <Text>KeyTopic</Text>
        <Button title={'View Topic Flashcards'} onPress={openBottomSheet} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <FlashCardsContainer flashcards={dummyCards} closeSheet={closeBottomSheet} />
        </BottomSheetModal>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KeyTopic;
