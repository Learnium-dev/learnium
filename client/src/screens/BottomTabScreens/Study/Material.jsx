// React native
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Easing,
  ScrollView,
  FlatList,
} from "react-native";

// React
import { useState, useRef, useMemo, useCallback, useEffect } from "react";

// Components
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FlashCardsContainer from "../../../containers/FlashCardsContainer";
import NavHeader from "../../../components/NavHeader";
import KeyTopicListItem from "../../../components/KeyTopicListItem";
import DueCalendar from "../../../../assets/icons/due-calendar.svg";
import QuizCard from "../Progress/components/QuizCard";
import BadgeIcon from "../../../../assets/icons/badge-icon.svg";

// Utils
import { shortDateOptions } from "../../../../utils/helpers";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { globalStyles } from "../../../../assets/common/global-styles";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKeyTopics,
  fetchMaterial,
} from "../../../../slices/materialsSlice";

// Base Url
import baseURL from "../../../../assets/common/baseUrl";

// Axios
import axios from "axios";

// SVGs
import { Feather } from "@expo/vector-icons";
import LumiBanner from "../../../../assets/images/characters/quizHistoryLumi.svg";

const Material = (props) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  // Selectors
  const material = useSelector((state) => state.material.material);
  const keyTopics = useSelector((state) => state.material.keyTopics);
  const { token } = useSelector((state) => state.credentials);

  const { keyTopic } = props.route.params;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["95%"], []);
  const [quizzes, setQuizzes] = useState([]);
  const [completedKeyTopics, setCompletedKeyTopics] = useState(0);

  useEffect(() => {
    dispatch(fetchMaterial(keyTopic.folderid._id));
    dispatch(fetchKeyTopics());
  }, [dispatch]);

  // Update completed key topics when keyTopics or keyTopic changes
  useEffect(() => {
    const completedKeyTopicsCount = keyTopics.filter(
      (topic) => topic.progress === 100
    ).length;
    setCompletedKeyTopics(completedKeyTopicsCount);
  }, [keyTopics]);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  };

  // fetch quizzes
  useEffect(() => {
    console.log("This is the folder id: ", keyTopic?.folderid?._id);
    const fetchQuizzes = async (jwtToken) => {
      try {
        const response = await axios.get(
          `${baseURL}historydetails?folderid=${keyTopic?.folderid?._id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const sortingQuizzes = response?.data?.historyquizzes?.sort(
          (a, b) => b?.progress - a?.progress
        );
        setQuizzes(sortingQuizzes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizzes(token);
  }, []);

  // Sort key topics by progress to show lowest last
  const sortedKeyTopics = [...keyTopics].sort((a, b) => b.progress - a.progress);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <NavHeader title={material?.name} showMenu={false} />
      <ScrollView style={styles.main}>
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
            <BadgeIcon style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.statsItemText}>Best Score:</Text>
              <Text style={styles.statsItemText}>
                {quizzes[0]?.progress || 0}
              </Text>
            </View>
          </View>
        </View>

        {/*  KEY TOPICS SUMMARY */}
        <Pressable
          style={styles.collapsibleKeytopics}
          onPress={() =>
            navigate("MaterialSummary", {
              keyTopics: keyTopics,
              material: material,
              openBottomSheet: openBottomSheet,
            })
          }
        >
          <View style={{ height: 170, maxHeight: 170, overflow: "hidden" }}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text numberOfLines={5} ellipsizeMode="tail">
              {keyTopics.map((keyTopic, index) => (
                <Text
                  style={{ display: "flex", marginBottom: 20 }}
                  key={keyTopic._id}
                >
                  <Text
                    style={{
                      ...styles.summaryText,
                      fontFamily: "Nunito-SemiBold",
                    }}
                  >
                    Key Topic {index + 1}: {keyTopic.name}
                    {"\n"}
                  </Text>
                  <Text style={styles.summaryText}>{keyTopic.summary}</Text>
                  {"\n"}
                  {"\n"}
                </Text>
              ))}
            </Text>
            <Text style={styles.ellipsis}>...</Text>
          </View>
        </Pressable>

        {/*  FLASHCARD Button and Sheet */}
        <Pressable style={styles.flashCardsButton} onPress={openBottomSheet}>
          <Text style={styles.flashCardsButtonText}>Study Flashcards</Text>
        </Pressable>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <FlashCardsContainer
            keyTopic={keyTopic}
            studyMaterial={true}
            closeSheet={closeBottomSheet}
          />
        </BottomSheetModal>

        {/*  KEY TOPICS LIST */}
        <View style={styles.collapsibleKeytopics}>
          <View style={{}}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={styles.summaryTitle}>Key Topics</Text>
              <View
                style={{
                  backgroundColor: globalStyles.colors.accent,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontFamily: "Nunito-Bold" }}>
                  {completedKeyTopics} / {keyTopics.length}
                </Text>
              </View>
            </View>

            {keyTopics && keyTopics.length ? (
              sortedKeyTopics.map((topic, index) => {
                return (
                  <KeyTopicListItem
                    key={index}
                    topic={topic}
                    onPress={() => navigate("KeyTopic", { keyTopic: topic })}
                  />
                );
              })
            ) : (
              <Text>There are no topics here!</Text>
            )}
          </View>
        </View>

        {/* Review button */}
        <Pressable
          onPress={() => console.log("Review")}
          style={({ pressed }) =>
            pressed
              ? { ...styles.buttonPrimary, ...styles.buttonPrimaryPressed }
              : styles.buttonPrimary
          }
        >
          <Text style={styles.buttonText}>Review what you missed out</Text>
        </Pressable>

        {/* QUIZ HISTORY (COMPREHENSIVE) */}
        <View
          style={{
            ...styles.collapsibleKeytopics,
            marginBottom: 50,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.historyTitle}>Comprehensive Test History</Text>
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
              <LumiBanner width={140} height={95} />
              <Text
                style={{
                  flexShrink: 1,
                  fontSize: 18,
                  fontFamily: "Gabarito-Bold",
                  color: "#262626",
                  textAlign: "center",
                }}
              >
                Average Score in your past quizzes
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                horizontal={true}
                contentContainerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 10,
                  width: "100%",
                  marginTop: 15,
                }}
                data={quizzes}
                renderItem={({ item }) => {
                  if (item?.progress > 0) {
                    return <QuizCard item={item} />;
                  }
                }}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      {/* Start test button */}
      <View style={styles.fixedButton}>
        <Pressable
          onPress={() => console.log("start test")}
          style={({ pressed }) =>
            pressed
              ? { ...styles.buttonPrimary, ...styles.buttonPrimaryPressed }
              : styles.buttonPrimary
          }
        >
          <Text style={styles.buttonText}>Start a comprehensive test</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    marginBottom: 90
  },
  stats: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    marginBottom: 30,
  },
  statsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    marginRight: 20,
  },
  statsItemText: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  collapsibleKeytopics: {
    width: "100%",
    padding: 20,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    marginBottom: 20,
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
    marginBottom: 20,
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
  historyTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#7000FF",
    marginBottom: 10,
  },
  ellipsis: {
    position: "absolute",
    bottom: 0,
    right: 30,
    color: globalStyles.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonPrimary: {
    color: "#fff",
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonPrimaryPressed: {
    backgroundColor: globalStyles.colors.buttonPressed
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Gabarito-Bold",
  },
  fixedButton: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingTop: 20,
  },
});

export default Material;
