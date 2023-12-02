import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Touchable,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

// React
import { useState, useRef, useMemo, useCallback, useEffect } from "react";

// Axios
import axios from "axios";

// Components
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import FlashCardsContainer from "../../../containers/FlashCardsContainer";
import NavHeader from "../../../components/NavHeader";
import DueCalendar from "../../../../assets/icons/due-calendar.svg";
import StudiedCalendar from "../../../../assets/icons/studied-calendar.svg";
import BadgeIcon from "../../../../assets/icons/badge-icon.svg";
import { formatDate, shortDateOptions } from "../../../../utils/helpers";
import QuizContainer from "../../../containers/QuizContainer";
import ConfirmModal from "../../../components/ConfirmModal";
import QuizCard from "../Progress/components/QuizCard";

// Styles
import { globalStyles } from "../../../../assets/common/global-styles";

// React Navigation
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

// Base Url
import baseURL from "../../../../assets/common/baseUrl";

// helpers
import { getLumiHistory } from "../../../../utils/getLumiHistory";

// Redux
import { useSelector } from "react-redux";

// SVG
import LumiNoQuiz from "../../../../assets/images/characters/LumiNoQuiz.svg";
import AskAI from "../../../../assets/icons/askAI.svg";

const KeyTopic = (props) => {
  const { navigate } = useNavigation();
  const { keyTopic } = props.route.params;
  const { token } = useSelector((state) => state.credentials);
  const [quizzes, setQuizzes] = useState([]);
  const [average, setAverage] = useState(0);

  const bottomSheetModalRef = useRef(null);
  const quizModalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // quizModalRef.current.dismiss();
    setIsModalOpen(true);
  };

  const handleRightBtn = () => {
    setIsModalOpen(false);
  };

  const handleLeftBtn = () => {
    quizModalRef.current.dismiss();
    setIsModalOpen(false);
  };

  const handleAskAI = (keyTopic) => {
    console.log("handleAskAI", keyTopic.keyTopic.name);

    const askAIprops = {
      askTopic: keyTopic.keyTopic.name,
      questionAsk: "",
      wrongAnswer: "",
    };
    navigate("AskAI", askAIprops);
  };

  // fetch quizzes
  useEffect(() => {
    const fetchQuizzes = async (jwtToken) => {
      try {
        const response = await axios.get(
          `${baseURL}historyquizzes?keytopicid=${keyTopic?._id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const sortingQuizzes = response?.data.sort(
          (a, b) => b?.progress - a?.progress
        );
        setQuizzes(sortingQuizzes);

        // Calculate the average of quizzes
        let totalProgress = response?.data.reduce(
          (sum, quiz) => sum + quiz.progress,
          0
        );
        const averageProgress = totalProgress / response.data.length;
        setAverage(averageProgress);

        console.log("THIS IS THE AVERAGE: ", average);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizzes(token);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          // backgroundColor: "gold",
        }}
      >
        <NavHeader title={keyTopic.name} keyTopic={keyTopic} showMenu={true} />
        {/* ASK AI */}

        <TouchableOpacity
          style={{
            // backgroundColor: "red",
            height: 40,
            position: "absolute",
            zIndex: 1,
            bottom: 100,
            right: 20,
            borderRadius: 500,
            display: "flex",
            justifyContent: "center",
          }}
          onPress={() => handleAskAI({ keyTopic })}
        >
          <AskAI />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.main}>
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
                <Text style={styles.statsItemText}>
                  {formatDate(quizzes[0]?.duedate)}
                </Text>
              </View>
            </View>
            <View style={styles.statsItem}>
              <BadgeIcon style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.statsItemText}>Best Score:</Text>
                <Text style={styles.statsItemText}>
                  {quizzes[0]?.progress || 0}
                </Text>
              </View>
            </View>
          </View>

          {/*  SUMMARY */}
          <Pressable
            style={styles.summary}
            onPress={() =>
              navigate("KeyTopicSummary", {
                keyTopic: keyTopic,
                openBottomSheet: openBottomSheet,
              })
            }
          >
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>{keyTopic.summary}</Text>
            <Text style={styles.ellipsis}>...</Text>
          </Pressable>

          {/*  FLASHCARD */}
          <Pressable style={styles.flashCardsButton} onPress={openBottomSheet}>
            <Text style={styles.flashCardsButtonText}>Study Flashcards</Text>
          </Pressable>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
          >
            <BottomSheetView style={{ backgroundColor: "transparent" }}>
              <FlashCardsContainer
                keyTopic={keyTopic}
                closeSheet={closeBottomSheet}
              />
            </BottomSheetView>
          </BottomSheetModal>

          {/* Quiz History */}
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 60,
            }}
          >
            <Text style={styles.historyTitle}>Quiz History</Text>

            {/* Banner */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {false ? (
                <LumiNoQuiz width={140} height={95} />
              ) : (
                <View style={{ width: 140, height: 95 }}>
                  <View style={{ position: "absolute", left: -53, top: -20 }}>
                    {getLumiHistory(average)}
                  </View>
                </View>
              )}

              <Text
                style={{
                  flexShrink: 1,
                  fontSize: 18,
                  fontFamily: "Gabarito-Bold",
                  color: "#262626",
                  textAlign: "center",
                }}
              >
                {quizzes.length < 3
                  ? "Complete 3 quizzes to get a grade!"
                  : "Average Score in your past quizzes"}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {!quizzes.length ? (
                <Text
                  style={{
                    fontFamily: "Nunito-Bold",
                    fontSize: 18,
                    color: "#949494",
                    marginTop: 32,
                    marginLeft: 20,
                  }}
                >
                  Take your first quiz now!
                </Text>
              ) : (
                <FlatList
                  horizontal={true}
                  contentContainerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 10,
                    width: "100%",
                    marginVertical: 15,
                  }}
                  data={quizzes}
                  renderItem={({ item }) => {
                    if (item?.progress > 0) {
                      return <QuizCard item={item} />;
                    }
                  }}
                  keyExtractor={(item) => item.id}
                />
              )}
            </ScrollView>
          </View>

          <BottomSheetModal
            ref={quizModalRef}
            index={0}
            snapPoints={snapPoints}
            name="Quiz"
            handleStyle={{ backgroundColor: "#f5f5f5" }}
          >
            <QuizContainer
              keyTopic={keyTopic}
              closeSheet={closeQuiz}
              isSubmit={handleLeftBtn}
            />
          </BottomSheetModal>
        </ScrollView>
        {/*  QUIZ */}
        <View style={styles.startBtn}>
          <Pressable style={styles.quizButton} onPress={openQuiz}>
            <Text style={styles.quizButtonText}>Start Quiz</Text>
          </Pressable>
        </View>
        {isModalOpen ? (
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={handleLeftBtn}
            title={"Are you sure you want to close the quiz?"}
            subTitle={"You can’t continue this quiz later!"}
            leftBtnText={"Close"}
            rightBtnText={"Go back"}
            leftBtnFunction={handleLeftBtn}
            rightBtnFunction={handleRightBtn}
          >
            <Text>Modal Content</Text>
          </ConfirmModal>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "start",
    padding: 20,
  },
  stats: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
    marginBottom: 23,
    marginTop: -1,
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
    height: 220,
    flexDirection: "column",
    alignItems: "start",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
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
    paddingBottom: 60,
  },
  flashCardsButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    marginTop: 8,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  flashCardsButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
    color: globalStyles.colors.primary,
  },
  quizButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
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
    marginBottom: 5,
  },

  historyTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginVertical: 16,
    color: "#7000FF",
  },
  startBtn: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 5,
    // borderTopWidth: 1,
    paddingHorizontal: 20,
    // borderTopColor: "#CDCDCD",
    backgroundColor: "#F5f5f5",
  },
  ellipsis: {
    position: "absolute",
    bottom: 15,
    right: 30,
    color: globalStyles.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default KeyTopic;
