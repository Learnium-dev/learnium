import { View, Text, Pressable } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/native";

// icons
import Correct from "../../../../../../assets/icons/quiz/correct.svg";
import Wrong from "../../../../../../assets/icons/quiz/wrongRed.svg";

// styles
import { styles } from "../../styles/quizResult";

const AnswerCard = ({ item }) => {
  const { navigate } = useNavigation();

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
    <View
      style={{
        ...styles.answerCard,
        borderColor: `${item?.correct ? "#7000FF" : "#FF4c4c"}`,
      }}
    >
      <Text
        style={{
          ...styles.answerTitle,
          color: `${item?.correct ? "#7000FF" : "#FF4c4c"}`,
        }}
      >
        {item?.question}
      </Text>
      <Text style={styles.answerDetail}>{item?.correctanswer}</Text>
      {!item?.correct && (
        <Pressable
          style={styles.askAI}
          onPress={() => handleAskAI(item?.question, item?.answer)}
        >
          <Text style={styles.askAIText}>Ask AI</Text>
        </Pressable>
      )}
      <View
        style={{
          ...styles.iconBox,
          backgroundColor: `${item?.correct ? "#7000FF" : "#FFF"}`,
          borderColor: `${item?.correct ? "#7000FF" : "#FF4C4C"}`,
        }}
      >
        {item?.correct ? (
          <Correct width={22} height={22} />
        ) : (
          <Wrong width={22} height={22} />
        )}
      </View>
    </View>
  );
};

export default AnswerCard;
