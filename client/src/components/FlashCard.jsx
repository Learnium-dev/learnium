import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import TermFirstView from "../layout/TermFirstView";
import DefinitionFirstView from "../layout/DefinitionFirstView";
import { globalStyles } from "../../assets/common/global-styles";
import FlipCard from "react-native-flip-card";
import BookmarkFront from "../../assets/icons/bookmarkFront.svg";
import BookmarkBackFilled from "../../assets/icons/bookmarkBackFilled.svg";
import { useDispatch, useSelector } from "react-redux";
import flashCardsSlice from "../../slices/flashCardsSlice";
import FlashCardInfoView from "../layout/FlashCardInfoView";

// import { useSelector } from "react-redux";

const FlashCard = ({ card, termFirst, markDifficult }) => {
  // get token from useSelector
  const { token } = useSelector((state) => state.credentials);

  const [cardCorrectanswer, setCardCorrectanswer] = useState(
    card.correctanswer
  );
  const [cardQuestion, setCardQuestion] = useState(card.question);
  const cardIndex = useSelector((state) => state.flashCards.cardIndex);
  const showingInfo = useSelector((state) => state.flashCards.showingInfo);
  const dispatch = useDispatch();
  const { updateCardAnswer, setShowingInfo } = flashCardsSlice.actions;
  const [answer, setAnswer] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrectLoading, setIsCorrectLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const isCorrectArray = [
    "Correct",
    "Almost Correct",
    "Somewhat Correct",
    "Incorrect",
  ];
  const [isCorrect, setIsCorrect] = useState("");
  const [isCorrectFeedback, setIsCorrectFeedback] = useState("");

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    handleSubmitAnswer();
    if (!isValidated) {
      compareAnswer();
    }
  };

  const handleSubmitAnswer = () => {
    // Save the answer to the flashcards state (not the database)
    // If we need to save to database, we can do it in flashCardsSlice (similar to updateFlashcard)
    dispatch(updateCardAnswer({ index: cardIndex, answer: answer }));
  };

  // function to compare the answer to the correct answer and use openAI to compare whether the answer is correct, almost correct, somewhat correct, or incorrect
  const compareAnswer = async () => {
    // only compare the answer if the card is flipped. isFlipped is false
    if (isFlipped) {
      return;
    }

    // check if the answer is empty, if it is, return
    if (answer === "") {
      return;
    }
    setIsCorrectLoading(true);
    // get the string from the answer and create object to send as body in fetch request
    const inputToOpenAI = {
      answer: answer,
      correctAnswer: termFirst ? cardQuestion : cardCorrectanswer,
    };

    // fetch request to openAI to compare the answer to the correct answer
    // if the answer is correct, set isCorrect to "Correct" "Almost Correct" "Somewhat Correct" "Incorrect"
    const submitToOpenAI = async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_HOSTNAME_COMPLETE}/validateflashcardanswer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputToOpenAI),
        }
      );

      const data = await response.json();

      setIsCorrect(data.response);
      // setIsCorrectFeedback(data.feedback);
      setIsCorrectLoading(false);
      setIsValidated(true);
    };
    submitToOpenAI();
  };

  const renderSide = () => {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Pressable
          style={{
            ...styles.bookmark,
            display: showingInfo ? "none" : "block",
          }}
          onPress={() => markDifficult(card)}
        >
          {!card.isdone ? (
            <BookmarkFront style={styles.bookmarkIcon} />
          ) : (
            <BookmarkBackFilled style={styles.bookmarkIcon} />
          )}
        </Pressable>
        {termFirst ? (
          <TermFirstView
            isFlipped={isFlipped}
            details={card}
            answer={answer}
            // aiFeedback={isCorrectFeedback}
            aiResponse={isCorrect}
            onAnswer={setAnswer}
            feedbackLoading={isCorrectLoading}
          />
        ) : (
          <DefinitionFirstView
            isFlipped={isFlipped}
            details={card}
            answer={answer}
            feedbackLoading={isCorrectLoading}
            // aiFeedback={isCorrectFeedback}
            aiResponse={isCorrect}
            onAnswer={setAnswer}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : Platform.OS === "android"
          ? "height"
          : null
      }
      style={styles.keyboardContainer}
    >
      <View style={styles.mainContainer}>
        {/* Decorative card deck */}
        <View
          style={{
            ...styles.deckOne,
            display: showingInfo ? "none" : "block",
          }}
        />
        <View
          style={{
            ...styles.deckTwo,
            display: showingInfo ? "none" : "block",
          }}
        />

        <View style={styles.cardContainer}>
          {/* Show flashcard info */}
          {showingInfo && <FlashCardInfoView />}

          {/* SHOW FLASHCARD */}
          <FlipCard
            style={{
              ...styles.card,
              backgroundColor: isFlipped
                ? globalStyles.colors.primary
                : "white",
            }}
            friction={10}
            flipHorizontal={true}
            flipVertical={false}
            clickable={true}
            onFlipStart={flipCard}
          >
            {renderSide()}
            {renderSide()}
          </FlipCard>
        </View>

        {/* INFO BUTTON */}
        <View style={styles.infoButtonContainer}>
          <TouchableOpacity
            style={{
              ...styles.infoButton,
              backgroundColor: showingInfo
                ? "white"
                : globalStyles.colors.primary,
            }}
            onPress={() => dispatch(setShowingInfo(!showingInfo))}
          >
            <Text
              style={{
                ...styles.infoButtonText,
                color: showingInfo ? "black" : "white",
              }}
            >
              i
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    paddingTop: 40,
    marginBottom: 50,
  },
  deckOne: {
    height: 30,
    width: "92%",
    height: "86%",
    alignSelf: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    backgroundColor: "white",
    borderRadius: 20,
    top: 28,
    zIndex: -1,
  },
  deckTwo: {
    height: 30,
    width: "84%",
    height: "80%",
    alignSelf: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    top: 18,
    zIndex: -2,
  },
  bookmark: {
    position: "absolute",
    right: 30,
    top: -6,
    zIndex: 1,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    marginBottom: 40,
    position: "relative",
  },
  card: {
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  infoButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -5,
  },
  infoButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: globalStyles.colors.primary,
  },
  infoButtonText: {
    color: "white",
    fontSize: 25,
    fontFamily: "Gabarito-Bold",
    margin: "auto",
    marginBottom: 5,
    textAlign: "center",
    position: "relative",
    top: 10,
  },
  instructions: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default FlashCard;
