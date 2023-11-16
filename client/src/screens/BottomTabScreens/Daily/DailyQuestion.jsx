// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// axios
import axios from "axios";

// Styles
import { styles } from "./styles/indexStyles";

// Carrousel
import PagerView from "react-native-pager-view";

// SVGs
import LumiStreak from "../../../../assets/images/characters/daily/lumiStreak.svg";
import ArrowBack from "../../../../assets/icons/arrow_back.svg";
import { Ionicons } from "@expo/vector-icons";
import Correct from "../../../../assets/icons/checkmark.svg";
import Wrong from "../../../../assets/icons/crossWrong.svg";

// helpers
import baseURL from "../../../../assets/common/baseUrl";

const DailyQuestion = () => {
  const { navigate } = useNavigation();
  const [dailyQuestion, setDailyQuestion] = useState("");
  const { dailyKeyTopicId } = useSelector((state) => state.exam);
  const { token } = useSelector((state) => state.credentials);
  const [answer, setAnswer] = useState("");

  const validateUserAnswer = () => {
    const correctAnswer = dailyQuestion?.correctanswer[0]?.toLowerCase();
    const userAnswer = answer.toLowerCase();

    return correctAnswer === userAnswer;
  };

  const renderIcon = () => {
    if (answer) {
      if (validateUserAnswer()) {
        return <Correct width={20} height={20} style={styles.icons} />;
      } else {
        return <Wrong width={20} height={20} style={styles.icons} />;
      }
    }
  };

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      const options = {
        method: "GET",
        url: `${baseURL}details/singlequestion?keytopicid=${dailyKeyTopicId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(options);
        console.log("This is the daily quesion: ", response.data);
        setDailyQuestion(response.data);
        return response.data;
      } catch (error) {
        console.error("Error getting keyTopics", error);
      }
    };
    fetchDailyQuestion();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ArrowBack width={30} height={30} onPress={() => navigate("Daily")} />
          <Text style={styles.title}>Daily Question</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <LumiStreak width={190} height={190} />
          <View style={styles.streakBox}>
            <Text style={styles.titleStreak}>7</Text>
            <Text style={styles.subtitleStreak}>day streak!</Text>
          </View>
        </View>

        {/* Daily Question */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <PagerView style={{ height: 250 }} pageMargin={10} initialPage={0}>
            <View key="1" style={styles.dailyQuestionBox}>
              {/* header */}
              <View style={styles.dailyHeader}>
                <Ionicons
                  name="ios-chevron-back-outline"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Nunito-Bold",
                    fontSize: 14,
                  }}
                >
                  Dec 6, 2023
                </Text>
                <Ionicons name="ios-chevron-forward" size={24} color="white" />
              </View>
              {/* question */}
              <Text style={styles.question}>
                {dailyQuestion?.question || (
                  <ActivityIndicator size="large" color="#FFF" />
                )}
              </Text>
              {/* answer */}
              <View style={{ width: "100%" }}>
                <TextInput
                  onBlur={validateUserAnswer}
                  onChangeText={(text) => setAnswer(text)}
                  style={styles.answer}
                  placeholder="Type answer here"
                />
                {renderIcon()}
              </View>
            </View>

            <View key="2" style={styles.dailyQuestionBox}>
              {/* header */}
              <View style={styles.dailyHeader}>
                <Ionicons
                  name="ios-chevron-back-outline"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Nunito-Bold",
                    fontSize: 14,
                  }}
                >
                  Dec 12, 2023
                </Text>
                <Ionicons name="ios-chevron-forward" size={24} color="white" />
              </View>
              {/* question */}
              <Text style={styles.question}>
                What were the turning points of World War II and which country
                was responsible?
              </Text>
              {/* answer */}
              <View style={{ width: "100%" }}>
                <TextInput
                  onBlur={() => console.log("Text out!")}
                  onChangeText={(text) => setAnswer(text)}
                  style={styles.answer}
                  placeholder="Type answer here"
                />
              </View>
            </View>
          </PagerView>
        </KeyboardAvoidingView>

        {/* study button */}
        <TouchableOpacity
          style={styles.studyButton}
          onPress={() => navigate("StudyHome", { screen: "Study" })}
        >
          <Text style={styles.studyButtonText}>Start Studying</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyQuestion;
