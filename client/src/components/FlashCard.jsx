import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

const FlashCard = ({ card, next, previous, onCardChange }) => {
  console.log("card.difficult:", card.difficult);
  const [showAnswer, setShowAnswer] = useState(false);
  const [instructionText, setInstructionText] = useState(
    "Tap to See the Answer"
  );

  // Check if the card is marked as difficult and render the difficulty mark
  const difficultyMark = card.difficult ? (
    <View style={styles.difficultyMark}>
      <Text style={styles.difficultyMarkText}>Difficult</Text>
    </View>
  ) : null;

  useEffect(() => {
    if (showAnswer) {
      setInstructionText("Tap to See the Question");
    } else {
      setInstructionText("Tap to See the Answer");
    }
  }, [showAnswer]);

  function toggleAnswer() {
    setShowAnswer(!showAnswer);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={toggleAnswer}>
      {difficultyMark}
      <Text style={styles.textContainer}>
        {showAnswer ? card.answer : card.question}
      </Text>
      <Text style={styles.instructions}>{instructionText}</Text>
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
      {!showAnswer && !card.difficult && (
        <TouchableOpacity onPress={() => onCardChange(card)}>
          <Text style={styles.difficultButtonText}>
            Mark this Flash Card as Difficult
          </Text>
        </TouchableOpacity>
      )}
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