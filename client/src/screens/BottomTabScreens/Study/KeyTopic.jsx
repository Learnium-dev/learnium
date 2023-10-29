import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useRef, useMemo, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FlashCardsContainer from "../../../containers/FlashCardsContainer";
import NavHeader from "../../../components/NavHeader";
import DueCalendar from "../../../../assets/icons/due-calendar.svg";
import StudiedCalendar from "../../../../assets/icons/studied-calendar.svg";
import BadgeIcon from "../../../../assets/icons/badge-icon.svg";
import { shortDateOptions } from "../../../../utils/helpers";
import { globalStyles } from "../../../../assets/common/global-styles";
import QuizContainer from "../../../containers/QuizContainer";

const KeyTopic = (props) => {
  const { keyTopic } = props.route.params;
  console.log("KeyTopic: ", keyTopic);

  const bottomSheetModalRef = useRef(null);
  const quizModalRef = useRef(null);

  // height of the bottom sheet modal 95%
  const snapPoints = useMemo(() => ["95%"], []);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  };

  const openQuiz = useCallback(() => {
    quizModalRef.current?.present();
  }, []);

  const closeQuiz = () => {
    quizModalRef.current.dismiss();
  };

  return (
    <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <NavHeader title={keyTopic.name} />

      <View style={styles.main}>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <DueCalendar style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.statsItemText}>Due date:</Text>
              <Text style={styles.statsItemText}>
                {new Date(keyTopic.duedate).toLocaleDateString(
                  undefined,
                  shortDateOptions
                )}
              </Text>
            </View>
          </View>
          <View style={styles.statsItem}>
            <StudiedCalendar style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.statsItemText}>Studied:</Text>
              <Text style={styles.statsItemText}>N/A</Text>
            </View>
          </View>
          <View style={styles.statsItem}>
            <BadgeIcon style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.statsItemText}>Best Score:</Text>
              <Text style={styles.statsItemText}>N/A</Text>
            </View>
          </View>
        </View>

        {/*  SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>{keyTopic.summary}</Text>
        </View>

        {/*  FLASHCARD */}
        <Pressable style={styles.flashCardsButton} onPress={openBottomSheet}>
          <Text style={styles.flashCardsButtonText}>Study</Text>
        </Pressable>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <FlashCardsContainer
            keyTopic={keyTopic}
            closeSheet={closeBottomSheet}
          />
        </BottomSheetModal>

        {/*  QUIZ */}
        <Pressable style={styles.quizButton} onPress={openQuiz}>
          <Text style={styles.quizButtonText}>Start a Quiz</Text>
        </Pressable>

        <BottomSheetModal
          ref={quizModalRef}
          index={0}
          snapPoints={snapPoints}
          name="Quiz"
        >
          <QuizContainer keyTopic={keyTopic} closeSheet={closeQuiz} />
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "white",
    padding: 20,
  },
  stats: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
  },
  statsItemText: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  summary: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 10,
    color: globalStyles.colors.primary,
  },
  summaryText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
  },
  flashCardsButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  flashCardsButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: globalStyles.colors.primary,
  },
  quizButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "white",
  },

  quizButton: {
    width: "100%",
    backgroundColor: "white",

    backgroundColor: globalStyles.colors.primary,

    borderRadius: 40,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
  },
});

export default KeyTopic;
