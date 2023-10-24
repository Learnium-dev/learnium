import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import QuestionFirstView from "../layout/QuestionFirstView";
import AnswerFirstView from "../layout/AnswerFirstView";

const FlashCard = ({ card, next, previous, markValid, questionFirst }) => {
  // Details object from the details array
  // How to get the question and answer from here?
  const details = card.details[0];
  console.log("Flashcard details: ", details);

  const [isFlipped, setIsFlipped] = useState(false);
  const [instructionText, setInstructionText] = useState(
    "Tap to See the Answer"
  );

  // Check if the card is marked as difficult and render the difficulty mark
  const difficultyMark = details?.isdone ? (
    <View style={styles.difficultyMark}>
      <Text style={styles.difficultyMarkText}>Difficult</Text>
    </View>
  ) : null;

  useEffect(() => {
    if (isFlipped) {
      setInstructionText("Tap to See the Question");
    } else {
      setInstructionText("Tap to See the Answer");
    }
  }, [isFlipped]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmitAnswer = (answer) => {
    console.log("Answer submitted: ", answer);
    // Save the answer to the database

    // Flip the card
    flipCard();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={flipCard}>
      {difficultyMark}

      {questionFirst ? (
        <QuestionFirstView isFlipped={isFlipped} details={details} />
      ) : (
        <AnswerFirstView
          isFlipped={isFlipped}
          details={details}
          onSubmitAnswer={handleSubmitAnswer}
        />
      )}

      <Text style={styles.instructions}>{instructionText}</Text>

      {!isFlipped && (
        <TouchableOpacity onPress={() => markValid(card)}>
          <Text style={styles.difficultButtonText}>
            Mark this Flash Card as Difficult
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={previous}>
          <View>
            <AntDesign name="leftcircle" size={28} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <View>
            <AntDesign name="rightcircle" size={28} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    padding: 30,
    marginBottom: 40,
    paddingTop: 80,
  },
  textContainer: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
    marginTop: 80,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  instructions: {
    textAlign: "center",
    marginBottom: 80,
  },
  difficultyMark: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    border: "1px solid black",
  },
  difficultyMarkText: {
    fontSize: 12,
  },
  difficultButtonText: {
    textAlign: "center",
    marginBottom: 80,
  },
});

export default FlashCard;
