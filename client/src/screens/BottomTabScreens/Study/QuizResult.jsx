import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import ResultModal from "../../../components/ResultModal";
import {
  calculateQuizPercentage,
  calculateQuizScore,
} from "../../../services/calculateQuizResult";

import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

// styles
import { styles } from "./styles/quizResult";

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

  const handleAskAI = (question, answer) => {
    console.log("handleAskAI", question, answer);
    const askAIprops = {
      askTopic: "",
      questionAsk: question,
      wrongAnswer: answer,
    };
    navigate("AskAI", askAIprops);
  };

  return (
    <View>
      {isModalOpen ? (
        <ResultModal
          isOpen={isModalOpen}
          CTAbtnFunction={closeModal}
          result={result}
          percentage={percentage}
        ></ResultModal>
      ) : (
        <ScrollView>
          <Text>Quiz Result</Text>
          <Text>Correct: {score.correctCount}</Text>
          <Text>Incorrect: {score.incorrectCount}</Text>
          <Text>Time : {timeConsumed}</Text>

          {result.map((item, index) => {
            return (
              <View key={index}>
                <Text>Question: {item.question}</Text>
                <Text>Answer: {item.answer}</Text>
                {item.correct ? (
                  <Text>Correct</Text>
                ) : (
                  <View>
                    <Text>Incorrect</Text>

                    <TouchableOpacity
                      onPress={() => handleAskAI(item.question, item.answer)}
                    >
                      <Text>ASK AI Button</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <Text>Correct Answer: {item.correctanswer}</Text>
              </View>
            );
          })}

          <TouchableOpacity
            style={[styles.previousButton]}
            onPress={() => navigate("Study")}
          >
            <Text
              style={[
                styles.textAlignCenter,
                styles.textPrimary,
                styles.textBold,
              ]}
            >
              Back Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton]}
            onPress={() => navigate("ProgressPage")}
          >
            <Text
              style={[
                styles.textAlignCenter,
                styles.textWhite,
                styles.textBold,
              ]}
            >
              View Progress
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default QuizResult;
