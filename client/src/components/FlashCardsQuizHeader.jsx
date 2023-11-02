import { View, Pressable, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../assets/common/global-styles";
import Timer from "../../assets/icons/Timer.svg";
import { useState, useEffect } from "react";
import ProgressBarAnimated from "react-native-progress-bar-animated";

const FlashCardsQuizHeader = ({
  closeSheet,
  cardIndex,
  numberOfCards,
  practicing,
  isQuizTrue,
  isQuizStart,
  timeConsumed,
}) => {

  const [seconds, setSeconds] = useState(0);
  const [isQuiz, setIsQuiz] = useState(isQuizTrue);
  const progress = ((cardIndex + 1) / numberOfCards) * 100;
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
        timeConsumed(seconds+1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);


  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return formattedTime;
  };
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Pressable onPress={closeSheet}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        {isQuiz ? (
          isQuizStart ? null : (
            <Text style={styles.title}>Quiz</Text>
          )
        ) : (
          <Text style={styles.title}>Flashcards</Text>
        )}
      </View>
      {isQuizStart && (
        <>
          <View style={styles.timer}>
            <Timer />
            <Text> {formatTime(seconds)} </Text>
          </View>
          <View style={styles.index}>
            <Text style={styles.indexText}>
              {" "}
              
              {cardIndex + 1} / {numberOfCards}
            </Text>
          </View>
        </>
      )}

      {practicing && (
        <View style={styles.right}>
          <View style={styles.index}>
            <Text style={styles.indexText}>
              {" "}
              {cardIndex + 1} / {numberOfCards}
            </Text>
            <Pressable>
              <Feather name="more-vertical" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      )}

      {practicing && (
        <View style={{ height: 40, width: "100%" }}>
          <ProgressBarAnimated
            width={"100%"}
            height={20}
            value={progress}
            backgroundColor={"#7000FF"}
            borderRadius={100}
            useNativeDriver={false}
            borderColor={"#ECECEC"}
            borderWidth={2}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",

    // justifyContent: "center",
    // textAlign: "center",

    // justifyContent: "space-around",
    // justifyContent: "space-evenly",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // backgroundColor: "red",
  },

  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "Gabarito-Bold",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  timer: {
    // backgroundColor: "gold",
    display: "flex",
    // flexWrap:"wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  index: {
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // marginRight: 10,
  },
  indexText: {
    fontSize: 12,
    fontFamily: "Gabarito-Regular",
  },
});

export default FlashCardsQuizHeader;
