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

const FlashCardsContainer = ({ closeSheet, keyTopic }) => {
  const keyTopiId = keyTopic._id;
  const [quiz, setQuiz] = useState([]);
  const [token, setToken] = useState(null);
  const [isQuizStart, setIsQuizStart] = useState(false);

  const [cardIndex, setCardIndex] = useState(0);

  const pagerRef = useRef(null);

  const handleStart = (trueFalse, multipleChoice, written) => {
    console.log("trueFalse", trueFalse);
    console.log("multipleChoice", multipleChoice);
    console.log("written", written);
    const trueFalseString = () => {
      return trueFalse ? "&truefalse=true" : "";
    };
    const multipleChoiceString = () => {
      return multipleChoice ? "&multiplechoice=true" : "";
    };
    const writtenString = () => {
      return  written ? "&written=true" : "";
    };
    
    // Function to fetch quizzes with a valid token
    const fetchQuizzesWithToken = async (jwtToken) => {
      console.log(
        `${baseURL}details?keytopicid=${keyTopiId}${trueFalseString()}${multipleChoiceString()}${writtenString()}`
      );
      
      try {
        if(!trueFalse && !multipleChoice && !written){
          alert("Please select at least one quiz type")
          return
        }
        const response = await axios.get(
          `${baseURL}details?keytopicid=${keyTopiId}${trueFalseString()}${multipleChoiceString()}${writtenString()}}`,          
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setQuiz(response.data);
        console.log("Quiz loaded", response.data);
        setIsQuizStart(true);
      } catch (err) {
        console.log(err);
      }
    };

    // Get the token from AsyncStorage
    AsyncStorage.getItem("jwt")
      .then((jwt) => {
        if (jwt) {
          setToken(jwt);
          fetchQuizzesWithToken(jwt); // Fetch quizzes with the retrieved token
          // console.log(quizzes)
        } else {
          console.log("JWT token not found in AsyncStorage.");
        }
      })
      .catch((err) => {
        console.log(`Error retrieving JWT token from AsyncStorage. ${err} `);
      });
  };

  // !CONTROLING PAGERVIEW
  const next = (nextIndex) => {
    pagerRef.current.setPage(nextIndex > cards.length - 1 ? cards.length - 1 : nextIndex);
    setCardIndex(nextIndex);
  }

  const previous = (prevIndex) => {
    pagerRef.current.setPage(prevIndex < 0 ? 0 : prevIndex);
    setCardIndex(prevIndex);
    console.log('previous', cardIndex)
  }

  // const markDone = (details) => {
  //   // card is the details object
  //   updateDetails(details._id, { isdone: true }).then((updatedDetails) => {
  //     console.log('Details updated: ', updatedDetails);
  //     // Update the state
  //     const itemIndex = cards[0].details.findIndex((item) => item._id === details._id);
  //     cards[0].details[itemIndex] = updatedDetails;
  //     const updatedCards = [...cards, cards[0]];
  //     setCards(updatedCards);
  //   }, (error) => {
  //     alert('Error', `Couldn't update! ${error}`);
  //   });
  // };

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
              index={index}
              key={index}
              next={() => next(index + 1)}
              previous={() => previous(index - 1)}
              />
              // <FlashCard
              //   card={card}
              //   index={index}
              //   key={index}
              //   next={() => next(index + 1)}
              //   previous={() => previous(index - 1)}
                
              //   // markDone={markDone}
              // />
            );
          })}
        </PagerView>
        
      ) : (
        <QuizSetupView onStartQuiz={handleStart} keyTopic={keyTopic} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default FlashCardsContainer;
