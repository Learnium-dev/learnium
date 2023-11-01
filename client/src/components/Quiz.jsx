import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../../assets/common/global-styles";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";

const Quiz = ({ keyTopic, card, index, next, previous, quiz, quizResult }) => {
  //   const [isTextFilled, setIsTextFilled] = useState(false);

  //   console.log("quiz", quiz[index].type);
  //   console.log("quiz", quiz[index].question);
  //   console.log("card", card);
  //   console.log("index", index);
  //   console.log("next", next);
  //   console.log("previous", previous);

  const [correctanswer, setCorrectanswer] = useState(quiz[index].correctanswer);

  const handleTextChange = (text) => {
    console.log("text", text);
    // if(text.length > 0){
    //     setIsTextFilled(true);
    // }
  };

  const selectQuizOption = (option) => {
    console.log("🚀 ~ file: Quiz.jsx:26 ~ option:", option);
    console.log("correctanswer", correctanswer);
    if (option == correctanswer) {
      let result = {
        correct: true,
        question: quiz[index].question,
        answer: option,
        correctanswer: correctanswer,
      };
      quizResult(result);
      console.log("correctanswer", correctanswer);
      console.log("option", option);
      console.log("correct");
    } else {
      let result = {
        correct: false,
        question: quiz[index].question,
        answer: option,
        correctanswer: correctanswer,
      };
      quizResult(result);
      console.log("incorrect");
    }
  };
  return (
    <View>
      <View style={styles.titleWrap}>
        <Text>{keyTopic.folderid.name}</Text>
        <Text>{keyTopic.name}</Text>
      </View>

      <Text>{quiz[index].question}</Text>

      {quiz[index].options.length > 0 ? (
        quiz[index].options.map((option, index) => (
          <Pressable
            key={index}
            style={styles.optionButton}
            onPress={() => {
              selectQuizOption(option);
            }}
          >
            <Text>{option}</Text>
          </Pressable>
        ))
      ) : (
        <TextInput
          //   style={isTextFilled ? styles.paragraphInputFilled :  styles.paragraphInput}
          style={styles.paragraphInput}
          onChangeText={handleTextChange}
        ></TextInput>
      )}

      <Pressable onPress={() => previous()} style={styles.button}>
        <Text>Previous</Text>
      </Pressable>
      <Pressable onPress={() => next()} style={styles.button}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  titleWrap: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
  },
  paragraphInput: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
    borderWidth: 2,
    borderColor: "black",
    // borderColor: globalStyles.colors.primary,
    borderRadius: 20,
  },
  paragraphInputFilled: {
    // width: "100%",
    // height: 200,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
    // marginBottom: 60,
    // borderWidth: 2,
    // borderColor: "black",
    borderColor: globalStyles.colors.primary,
    // borderRadius: 20,
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
  optionButton: {
    width: "100%",
    backgroundColor: "white",

    // backgroundColor: globalStyles.colors.primary,
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
    marginBottom: 10,
  },
});
