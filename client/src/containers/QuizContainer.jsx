import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRef, useState, useEffect } from "react";
import PagerView from "react-native-pager-view";
import FlashCardsQuizHeader from "../components/FlashCardsQuizHeader";
import QuizSetupView from "../layout/QuizSetupView";
import Quiz from "../components/Quiz";
import { globalStyles } from "../../assets/common/global-styles";
import ConfirmModal from "../components/ConfirmModal";
import { getQuizzes } from "../services/quizService";
import { useNavigation } from "@react-navigation/native";

// redux
import { useSelector } from "react-redux";

// helper
import { calculateQuizPercentage } from "../services/calculateQuizResult";
import axios from "axios";
// URL
import baseURL from "../../assets/common/baseUrl";
import { ScrollView } from "react-native-gesture-handler";

const QuizContainer = ({ closeSheet, keyTopic, isSubmit }) => {
  const { navigate } = useNavigation();
  const [keyTopicId, setKeyTopicId] = useState(keyTopic._id);
  const [getKeyTopic, setGetKeyTopic] = useState(keyTopic);
  // const keyTopiId = keyTopic._id;
  const [quiz, setQuiz] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [result, setResult] = useState([]);
  const { token } = useSelector((state) => state.credentials);
  const [cardIndex, setCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeConsumed, setTimeConsumed] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitResult = async () => {
    const params = {
      result: result,
      keyTopic: getKeyTopic,
      quiz: quiz,
      timeConsumed: timeConsumed,
    };
    const requestBody = {
      quizzes: { progress: calculateQuizPercentage(result) },
      details: result,
    };

    console.log("Request body 🎉🎉🎉", requestBody);

    const options = {
      method: "POST",
      url: `${baseURL}historyquizzes?keytopicid=${getKeyTopic?._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: requestBody,
    };
    try {
      const response = await axios(options);
      const data = response.data;
      if (data.error) {
        alert(data.error);
        return;
      }
      console.log("✅✅ Posted to DB!");
      navigate("QuizResult", params);
      closeModal();
      isSubmit();
    } catch (error) {
      console.error(
        "Error occurred while making the request: ⚠️⚠️⚠️⚠️",
        error.message
      );
    }
  };

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

    // Function to fetch quizzes
    const fetchQuizzesWithToken = async () => {
      console.log("fetchQuizzesWithToken");
      if (!trueFalse && !multipleChoice && !written) {
        alert("Please select at least one quiz type");
        return;
      }

      getQuizzes(
        keyTopicId,
        trueFalseString(),
        multipleChoiceString(),
        writtenString()
      ).then((quizzes) => {
        console.log("Quizzes loaded", quizzes);
        setQuiz(quizzes);
        setIsQuizStart(true);
      });
      (error) => {
        alert("Error", `Something went wrong! ${error}`);
      };
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
  // console.log("previous", cardIndex);

  const setQuizResult = (res) => {
    let updateResult = () => {
      // store res to result array base on index
      let resultCopy = [...result];
      resultCopy[res.index] = res;
      return resultCopy;
    };
    setResult(updateResult);
  };

  const getTimeConsumed = (time) => {
    setTimeConsumed(time);
  };
  // console.log("result", result);
  return (
    <View style={styles.container}>
      <FlashCardsQuizHeader
        closeSheet={closeSheet}
        cardIndex={cardIndex}
        numberOfCards={quiz.length ? quiz?.length : 0}
        practicing={false}
        isQuizTrue={true}
        isQuizStart={isQuizStart}
        timeConsumed={getTimeConsumed}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
        <ConfirmModal
          isOpen={isModalOpen}
          leftBtnFunction={closeModal}
          rightBtnFunction={submitResult}
          title={"Are you sure you want to finish the quiz?"}
          subTitle={""}
          leftBtnText={"Review"}
          rightBtnText={"Finish"}
        ></ConfirmModal>
      ) : null}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    flex: 1,
    backgroundColor: "#F5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pagerView: {
    flex: 1,
    width: "100%",
    // backgroundColor: "red",
  },
});

export default QuizContainer;
