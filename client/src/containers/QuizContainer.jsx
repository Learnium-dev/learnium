import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRef, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import FlashCard from "../components/FlashCard";
import { updateDetails } from "../services/detailsService";
import FlashCardsQuizHeader from "../components/FlashCardsQuizHeader";
import QuizSetupView from "../layout/QuizSetupView";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Quiz from "../components/Quiz";
import { globalStyles } from "../../assets/common/global-styles";
import ConfirmModal from "../components/ConfirmModal";
import { getQuizzes } from "../services/quizService";

const FlashCardsContainer = ({ closeSheet, keyTopic }) => {
  const keyTopiId = keyTopic._id;
  const [quiz, setQuiz] = useState([]);
  const [token, setToken] = useState(null);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [result, setResult] = useState([]);

  const [cardIndex, setCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitResult = () => {

  }

  const pagerRef = useRef(null);

  const handleStart = (trueFalse, multipleChoice, written) => {
    const trueFalseString = () => {
      return trueFalse ? "&truefalse=true" : "";
    };
    const multipleChoiceString = () => {
      return multipleChoice ? "&multiplechoice=true" : "";
    };
    const writtenString = () => {
      return written ? "&written=true" : "";
    };

    // Function to fetch quizzes with a valid token
    const fetchQuizzesWithToken = async () => {
      console.log("fetchQuizzesWithToken");
      if (!trueFalse && !multipleChoice && !written) {
        alert("Please select at least one quiz type");
        return;
      }

      getQuizzes(keyTopiId, trueFalseString(), multipleChoiceString(), writtenString()).then(
        (quizzes) => {
          console.log("Quizzes loaded", quizzes);
          setQuiz(quizzes);
          setIsQuizStart(true);
        }
      );
      (error) => {
        alert("Error", `Something went wrong! ${error}`);
      }
     
    };

    fetchQuizzesWithToken();
  };

  // !CONTROLING PAGERVIEW
  const next = (nextIndex) => {
    if (nextIndex > quiz.length - 1) {
      console.log("nextIndex", nextIndex);
      openModal();
      return;
    }
    pagerRef.current.setPage(
      nextIndex > quiz.length - 1 ? quiz.length - 1 : nextIndex
    );
    setCardIndex(nextIndex);
  };

  const previous = (prevIndex) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (prevIndex < 0) {
      return;
    }
    console.log("🚀 ~ file: QuizContainer.jsx:84 ~ prevIndex:", prevIndex);
    pagerRef.current.setPage(prevIndex < 0 ? 0 : prevIndex);
    setCardIndex(prevIndex);
  };
  console.log("previous", cardIndex);

  const setQuizResult = (res) => {
    // expand the result with res and set it to result
    let updateResult = () => {
      // store res to result array base on index
      let resultCopy = [...result];
      resultCopy[res.index] = res;
      return resultCopy;
    };
    setResult(updateResult);
  };

  console.log("result", result);
  return (
    <View style={styles.container}>
      <FlashCardsQuizHeader
        closeSheet={closeSheet}
        cardIndex={cardIndex}
        numberOfCards={quiz.length ? quiz?.length : 0}
        practicing={false}
        isQuizTrue={true}
        isQuizStart={isQuizStart}
      />

      {isQuizStart ? (
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => {
            setCardIndex(e.nativeEvent.position);
          }}
        >
          {quiz.map((card, index) => {
            return (
              <Quiz
                keyTopic={keyTopic}
                quiz={quiz}
                // card={card}
                index={index}
                key={index}
                quizResult={setQuizResult}
                next={() => next(index + 1)}
                previous={() => previous(index - 1)}
              ></Quiz>
            );
          })}
        </PagerView>
      ) : (
        <QuizSetupView onStartQuiz={handleStart} keyTopic={keyTopic} />
      )}
      {isModalOpen ? (
        <ConfirmModal isOpen={isModalOpen} leftBtnFunction={closeModal} rightBtnFunction={submitResult} title={"Are you sure you want to finish the quiz?"} subTitle={""} leftBtnText={"Review"} rightBtnText={"Finish"}>
          
        </ConfirmModal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    backgroundColor: globalStyles.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
});

export default FlashCardsContainer;
