import { View, Text, StyleSheet, Pressable } from "react-native";
import axios from "axios";

import { useState } from "react";

const Daily = () => {
  const quizId = "6526091298b09122f9f1fbd9";
  const [dailyQuestion, setDailyQuestion] = useState({});
  const handlePress = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/details/dailyQuestion/${quizId}`
      );
      setDailyQuestion({
        question: data.question[0],
        answer: data.answer[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Daily Question</Text>
      </Pressable>
      <Text style={styles.question}>{dailyQuestion?.question}</Text>
      <Text style={styles.answer}>{dailyQuestion?.answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 5,
    margin: 50,
    width: 200,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    margin: 20,
  },
  answer: {
    fontSize: 20,
    margin: 20,
    color: "blue",
    textAlign: "left",
  },
});

export default Daily;
