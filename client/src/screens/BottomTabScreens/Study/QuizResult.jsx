import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import ResultModal from "../../../components/ResultModal";
import {
  calculateQuizPercentage,
  calculateQuizScore,
} from "../../../services/calculateQuizResult";

// Safe Area View
import { SafeAreaView } from "react-native-safe-area-context";

// Navigation
import { useNavigation } from "@react-navigation/native";

// ScrollView
import { ScrollView } from "react-native-gesture-handler";

// styles
import { styles } from "./styles/quizResult";

// icons
import Correct from "../../../../assets/icons/quiz/correct.svg";
import Wrong from "../../../../assets/icons/quiz/wrong.svg";
import Clock from "../../../../assets/icons/quiz/clock.svg";

// svgs
import Lumi from "../../../../assets/images/characters/quiz lumi/lumi quiz result.svg";

// components
import AnswerCard from "./components/QuizResult/AnswerCard";

const QuizResult = ({ route }) => {
  const { navigate } = useNavigation();
  console.log("route", route.params.result);
  const [result, setResult] = useState(route.params.result);
  const [timeConsumed, setTimeConsumed] = useState(route.params.timeConsumed);
  const [percentage, setPercentage] = useState(calculateQuizPercentage(result));
  const [score, setScore] = useState(calculateQuizScore(result));

  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isModalOpen ? (
        <ResultModal
          isOpen={isModalOpen}
          CTAbtnFunction={closeModal}
          result={result}
          percentage={percentage}
        ></ResultModal>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Strengthen Your Skills!</Text>
            <Text style={styles.headerSubtitle}>
              Check out what you might have missed in this quiz.
            </Text>
            <View style={styles.scoreBox}>
              <Text style={styles.score}>{percentage}%</Text>
              <View style={styles.totalAnsBox}>
                <Text style={styles.totalAns}>
                  {score?.correctCount}/
                  {score?.correctCount + score?.incorrectCount}
                </Text>
              </View>
            </View>
            <View style={{ position: "absolute", right: -15, bottom: -100 }}>
              <Lumi width={200} height={200} />
            </View>
          </View>
          {/* Content Box */}
          <View style={styles.contentBox}>
            {/* Review Answers section*/}
            <View>
              <Text style={styles.reviewTitle}>Review Answers</Text>
              <View style={styles.reviewAnsBox}>
                <View
                  style={{ ...styles.answersBox, backgroundColor: "#7000FF" }}
                >
                  <Correct width={20} height={15} />
                  <Text style={styles.answers}>{score.correctCount}</Text>
                </View>
                <View
                  style={{ ...styles.answersBox, backgroundColor: "#FF4C4C" }}
                >
                  <Wrong width={20} height={15} />
                  <Text style={styles.answers}>{score.incorrectCount}</Text>
                </View>
                <View
                  style={{
                    ...styles.answersBox,
                    backgroundColor: "#E8E8E8",
                    borderWidth: 2,
                    borderColor: "#7000FF",
                  }}
                >
                  <Clock width={30} height={24} />
                  <Text style={styles.timeConsumed}>00:{timeConsumed}</Text>
                </View>
              </View>
            </View>

            {/* Answers */}
            {result.map((item, index) => {
              return (
                <View key={index}>
                  <AnswerCard item={item} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
      {isModalOpen ? null : (
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => navigate("Study")}
          >
            <Text style={styles.btnsText}>Back Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btns, backgroundColor: "#7000FF" }}
            onPress={() => navigate("Progress", { screen: "ProgressPage" })}
          >
            <Text style={{ ...styles.btnsText, color: "#FFF" }}>
              View Progress
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default QuizResult;
