// full screen modal that has conditional rendering based on the result of the quiz

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";

// character image
// !WAITING FOR THE FINAL SVG
import ResultBeginner from "../../assets/resultCharacter/resultBeginner.svg";
import ResultAdvance from "../../assets/resultCharacter/resultAdvanced.svg";
import ResultIntermediate from "../../assets/resultCharacter/resultIntermediate.svg";
import ResultExpert from "../../assets/resultCharacter/resultExpert.svg";
import ResultMaster from "../../assets/resultCharacter/resultMaster.svg";

// mockup SVG
import LumiStar from "../../assets/images/characters/quiz lumi/Lumi Star.svg";
import Star from "../../assets/images/characters/quiz lumi/Star Lumi.svg";
import LumiQuizResult from "../../assets/images/characters/quiz lumi/lumi_quizresult.svg";

// Linear Gradient
import { LinearGradient } from "expo-linear-gradient";

// responsive width and height
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ResultModal = ({ isOpen, CTAbtnFunction, percentage, score }) => {
  const [percentageLevel, setPercentageLevel] = useState("");

  useEffect(() => {
    const getScoreLevel = () => {
      if (percentage >= 0 && percentage <= 20) {
        setPercentageLevel("beginner");
      } else if (percentage > 20 && percentage <= 40) {
        setPercentageLevel("intermediate");
      } else if (percentage > 40 && percentage <= 60) {
        setPercentageLevel("advanced");
      } else if (percentage > 60 && percentage <= 80) {
        setPercentageLevel("expert");
      } else if (percentage > 80) {
        setPercentageLevel("master");
      }
    };
    getScoreLevel();
  }, []);

  // dynamic messages
  const getDynamicMessage = () => {
    if (percentage >= 0 && percentage <= 20) {
      return "Keep Going!";
    } else if (percentage > 20 && percentage <= 40) {
      return "Not Bad!";
    } else if (percentage > 40 && percentage <= 60) {
      return "Good Job!";
    } else if (percentage > 60 && percentage <= 80) {
      return "Great Work!";
    } else if (percentage > 80) {
      return "Amazing!";
    } else {
      return "Keep Going!";
    }
  };

  //   function to return style based on score level
  const getScoreLevelStyle = () => {
    if (percentageLevel === "beginner") {
      return styles.beginner;
    } else if (percentageLevel === "intermediate") {
      return styles.intermediate;
    } else if (percentageLevel === "advanced") {
      return styles.advanced;
    } else if (percentageLevel === "expert") {
      return styles.expert;
    } else if (percentageLevel === "master") {
      return styles.master;
    }
  };

  //   function to return image based on score level
  const getScoreLevelImage = () => {
    if (percentageLevel === "beginner") {
      return <ResultBeginner width={250} height={280} />;
    } else if (percentageLevel === "intermediate") {
      return <ResultIntermediate width={250} height={280} />;
    } else if (percentageLevel === "advanced") {
      return <ResultAdvance width={250} height={280} />;
    } else if (percentageLevel === "expert") {
      return <ResultExpert width={250} height={280} />;
    } else if (percentageLevel === "master") {
      return <ResultMaster width={250} height={280} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <LinearGradient
        colors={["#722AFE", "#A655E0"]}
        style={{
          width: wp(100),
          height: hp(100),
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        style={{
          backgroundColor: "#FEE702",
          borderRadius: 16,
          paddingTop: 24,
          paddingHorizontal: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "Gabarito-Bold",
            fontSize: 40,
            color: "#5901e5",
          }}
        >
          {getDynamicMessage()}
        </Text>
        <Text
          style={{
            fontFamily: "Gabarito-Bold",
            fontSize: 80,
            color: "#5901e5",
          }}
        >
          {isNaN(percentage) ? "0%" : `${percentage}%`}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 0,
          right: -90,
          top: 80,
          zIndex: -1,
        }}
      >
        <LumiQuizResult width={550} height={600} />
        {/* <Star width={250} height={280} /> */}
      </View>
      {/* set the image to be displayed base on getScoreLevelImage */}
      {/* {getScoreLevelImage()} */}
      {/* <LumiStar width={250} height={280} /> */}
      <TouchableOpacity
        onPress={() => CTAbtnFunction()}
        style={{
          backgroundColor: "white",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 100,
          marginTop: 50,
          borderWidth: 2,
          borderColor: "#7000FF",
          width: 350,
          position: "absolute",
          bottom: 0,
        }}
      >
        <Text
          style={{
            fontFamily: "Gabarito-Bold",
            fontSize: 22,
            textAlign: "center",
            color: "#7000FF",
          }}
        >
          See Results
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  // create style for each level of score
  beginner: {
    backgroundColor: "red",
  },
  intermediate: {
    backgroundColor: "orange",
  },
  advanced: {
    backgroundColor: "yellow",
  },
  expert: {
    backgroundColor: "green",
  },
  master: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
    width: "100%",
    height: `100%`,
  },
});
