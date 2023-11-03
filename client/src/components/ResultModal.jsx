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
      return <ResultBeginner width={100} height={100} />;
    } else if (percentageLevel === "intermediate") {
      return <ResultIntermediate width={100} height={100} />;
    } else if (percentageLevel === "advanced") {
      return <ResultAdvance width={100} height={100} />;
    } else if (percentageLevel === "expert") {
      return <ResultExpert width={100} height={100} />;
    } else if (percentageLevel === "master") {
      return <ResultMaster width={100} height={100} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* set the view to have background color base on getScoreLevelStyle */}

      <Text style={{ fontSize: 20, color: "red" }}>ResultModal</Text>
      <Text>{percentage}</Text>

      {/* set the image to be displayed base on getScoreLevelImage */}
      {getScoreLevelImage()}

      <TouchableOpacity
        onPress={() => CTAbtnFunction()}
        style={{ backgroundColor: "black", padding: 10, borderRadius: 10 }}
      >
        <Text style={{ color: "red" }}>See Results</Text>
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
