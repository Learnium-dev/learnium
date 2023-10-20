import { View, Text, StyleSheet, Button } from "react-native";
import { useState, useRef, useMemo, useCallback } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FlashCardsContainer from '../../../containers/FlashCardsContainer';

const KeyTopic = (props) => {

  const { keyTopic } = props.route.params;
  console.log('KeyTopic: ', keyTopic)

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
          <FlashCardsContainer keytopicid={keyTopic._id} closeSheet={closeBottomSheet} />
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
