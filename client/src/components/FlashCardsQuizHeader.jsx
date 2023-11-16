import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../assets/common/global-styles";
import Timer from "../../assets/icons/Timer.svg";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PopupMenu from "./PopupMenu";

const { width } = Dimensions.get("window");

const FlashCardsQuizHeader = ({
  closeSheet,
  isQuizTrue,
  isQuizStart,
  timeConsumed,
  cardIndex,
  numberOfCards,
}) => {
  let barWidth = useRef(new Animated.Value(0)).current;

  // Selectors
  const currentIndex = useSelector((state) => state.flashCards.cardIndex);
  const practicing = useSelector((state) => state.flashCards.practicing);
  const cards = useSelector((state) => state.flashCards.cards);
  const [seconds, setSeconds] = useState(0);
  const [isQuiz, setIsQuiz] = useState(isQuizTrue);

  console.log("barWidth", barWidth);

  const barStyle = {
    ...styles.progressBar,
    width: barWidth,
  };

  useEffect(() => {
    if (cards.length > 0) {
      Animated.spring(barWidth, {
        toValue: width * ((currentIndex + 1) / cards.length),
        bounciness: 10,
        useNativeDriver: false,
        speed: 2,
      }).start();
    }
  }, [currentIndex, cards.length]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const flashCardsMenuOptions = [
    {
      text: "Edit card",
      onSelect: () => console.log("Edit"),
      disabled: true,
    },
    {
      text: "Add a card",
      onSelect: () => console.log("Add"),
      disabled: true,
    },
    {
      text: "Delete card",
      onSelect: () => console.log("Delete"),
      disabled: true,
    },
  ];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Pressable onPress={closeSheet}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          {isQuiz ? (
            isQuizStart ? null : (
              ""
            )
          ) : (
            <Text style={styles.title}>Flashcards</Text>
          )}
        </View>

        {isQuizStart && (
          <>
            <View style={styles.timer}>
              <Timer />
              {/* <Text>00:00:01</Text> */}
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
                {currentIndex + 1} / {cards.length}
              </Text>
            </View>
            <Pressable>
              <PopupMenu options={isQuiz ? [] : flashCardsMenuOptions} />
            </Pressable>
          </View>
        )}
      </View>

      {practicing && (
        <View style={styles.progressBarContainer}>
          <Animated.View style={barStyle} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // backgroundColor: "red",
    marginBottom: 10,
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
  // progressBar: {
  //   height: 20,
  //   width: "100%",
  //   marginBottom: 20,
  // },
  progressBarContainer: {
    display: "flex",
    position: "relative",
    marginVertical: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 25,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#7000FF",
    borderRadius: 100,
  },
});

export default FlashCardsQuizHeader;
