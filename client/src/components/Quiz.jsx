import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../../assets/common/global-styles";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";

const Quiz = ({ keyTopic, card, index, next, previous, quiz, quizResult }) => {
  const [correctanswer, setCorrectanswer] = useState(quiz[index].correctanswer);
  const [isOptionSelected, setIsOptionSelected] = useState("");

  const handleTextChange = (text) => {
    console.log("text", text);
    // if(text.length > 0){
    //     setIsTextFilled(true);
    // }
  };

  const selectQuizOption = (option) => {
    console.log("🚀 ~ file: Quiz.jsx:26 ~ option:", option);
    console.log("correctanswer", correctanswer);
    if (isOptionSelected == option) {
      setIsOptionSelected("");
      let result = {
        index: index,
        correct: null,
        question: null,
        answer: null,
        correctanswer: null,
      };
      quizResult(result);
    } else {
      setIsOptionSelected(option);
    }

    if (option == correctanswer && !isOptionSelected) {
      let result = {
        index: index,
        correct: true,
        question: quiz[index].question,
        answer: option,
        correctanswer: correctanswer,
      };
      quizResult(result);
      console.log("correctanswer", correctanswer);
      console.log("option", option);
      console.log("correct");
    } else if (option != correctanswer && !isOptionSelected) {
      let result = {
        index: index,
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
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={[styles.textBold]}>{keyTopic.folderid.name}</Text>
        <Text>{keyTopic.name}</Text>
      </View>

      <View style={styles.questionWrap}>
        <Text style={{ marginBottom: 10 }}>{quiz[index].question}</Text>

        {quiz[index].options.length > 0 ? (
          quiz[index].options.map((option, index) => (
            <Pressable
              key={index}
              style={
                isOptionSelected == option
                  ? styles.optionButtonSelected
                  : styles.optionButton
              }
              onPress={() => {
                selectQuizOption(option);
              }}
            >
              <Text
                style={
                  isOptionSelected == option
                    ? [
                        styles.textWhite,
                        styles.textBold,
                        styles.textAlignCenter,
                      ]
                    : [styles.textBold, styles.textAlignCenter]
                }
              >
                {option}
              </Text>
            </Pressable>
          ))
        ) : (
          <TextInput
            //   style={isTextFilled ? styles.paragraphInputFilled :  styles.paragraphInput}
            style={styles.paragraphInput}
            onChangeText={handleTextChange}
          ></TextInput>
        )}
      </View>

      <View style={styles.navigationButton}>
        <Pressable
          onPress={() => previous()}
          style={
            index == 0 ? [styles.previousButtonDisable] : styles.previousButton
          }
        >
          <Text
            style={
              index == 0
                ? [styles.textDisable, styles.textAlignCenter]
                : [
                    styles.textBold,
                    styles.textAlignCenter,
                    { color: "#7000FF" },
                  ]
            }
          >
            Previous
          </Text>
        </Pressable>
        <Pressable onPress={() => next()} style={styles.nextButton}>
          <Text
            style={[styles.textWhite, styles.textBold, styles.textAlignCenter]}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    paddingBottom: 40,
    // backgroundColor: "red",
  },
  questionWrap: {
    flex: 1,
  },
  titleWrap: {
    width: "100%",
    // height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 40,
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
    borderColor: "black",
    // borderColor: globalStyles.colors.primary,
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    marginBottom: 10,
  },
  optionButtonSelected: {
    width: "100%",
    backgroundColor: globalStyles.colors.primary,

    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  textWhite: {
    color: "white",
  },
  textDisable: {
    color: "rgba(0,0,0,0.25)",
  },
  textBold: {
    fontWeight: 700,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  previousButton: {
    // width: "45%",
    flex: 1,
    backgroundColor: "white",
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 16,
    borderWidth: 2,
  },
  previousButtonDisable: {
    // width: "45%",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 16,
  },
  nextButton: {
    // width: "45%",
    flex: 1,
    backgroundColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 16,
    borderWidth: 2,
    borderColor: "#7000FF",
  },
  navigationButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
});
