import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import QuestionFirstView from "../layout/QuestionFirstView";
import AnswerFirstView from "../layout/AnswerFirstView";
import GestureFlipView from 'react-native-gesture-flip-card';

const FlashCard = ({ card, next, previous, markDone, questionFirst }) => {

  // console.log('Flashcard details: ', card);

  const [isFlipped, setIsFlipped] = useState(false);
  const [instructionText, setInstructionText] = useState(
    "Tap to See the Answer"
  );
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const onViewLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(width, height)
    setCardWidth(width);
    setCardHeight(height);
  }

  const flipCardRef = useRef(null);

  // Check if the card is marked as difficult and render the difficulty mark
  const difficultyMark = card?.isdone ? (
    <View style={styles.difficultyMark}>
      <Text style={styles.difficultyMarkText}>Done</Text>
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
    isFlipped ? flipCardRef.current.flipLeft() : flipCardRef.current.flipRight();
  }

  const handleSubmitAnswer = (answer) => {
    console.log('Answer submitted: ', answer);
    // Save the answer to the database
    
    // Flip the card
    flipCard();
  }

  const renderFront = () => {
    return (
      <>
      {difficultyMark}
      { questionFirst ?
        <QuestionFirstView isFlipped={isFlipped} details={card} /> :
        <AnswerFirstView isFlipped={isFlipped} details={card} onSubmitAnswer={handleSubmitAnswer} />
      }

        {!isFlipped && (
          <TouchableOpacity onPress={() => markDone(card)}>
            <Text style={styles.difficultButtonText}>
              Mark this Flash Card as Done
            </Text>
          </TouchableOpacity>
        )}
      </>
    )
  }
  const renderBack = () => {
    return (
      <>
      {difficultyMark}
      { questionFirst ?
        <QuestionFirstView isFlipped={isFlipped} details={card} /> :
        <AnswerFirstView isFlipped={isFlipped} details={card} onSubmitAnswer={handleSubmitAnswer} />
      }

        {!isFlipped && (
          <TouchableOpacity onPress={() => markDone(card)}>
            <Text style={styles.difficultButtonText}>
              Mark this Flash Card as Done
            </Text>
          </TouchableOpacity>
        )}
      </>
    )
  }

  return (
    <View style={styles.container} onLayout={onViewLayout}>
      <Pressable onPress={flipCard} style={styles.pressable}>
        { cardWidth > 0 && cardHeight > 0 && <GestureFlipView
          ref={flipCardRef}
          gestureEnabled={false}
          width={cardWidth}
          height={cardHeight}
          >
            { renderBack() }
            { renderFront() }
          </GestureFlipView> }
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginBottom: 60
  },
  pressable: {
    flex: 1,
    // backgroundColor: 'red',
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
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    border: "1px solid black",
  },
  difficultyMarkText: {
    fontSize: 12,
    color: 'white',
  },
  difficultButtonText: {
    textAlign: "center",
    marginBottom: 80,
  },
});


export default FlashCard;