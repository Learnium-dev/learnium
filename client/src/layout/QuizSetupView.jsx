import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FlashCardsCharacter from "../../assets/images/characters/flashcards-character.svg";
import LumiQuizSetup from "../../assets/images/characters/LumiQuizSetup.svg";
// import LumiQuizSetup from "../../assets/images/characters/lumiQuizSetup.svg";
import { globalStyles } from "../../assets/common/global-styles";

const QuizSetupView = ({ onStartQuiz, keyTopic }) => {
  // console.log("keyTopic", keyTopic);
  const [trueFalse, setTrueFalse] = useState(true);
  const [multipleChoice, setMultipleChoice] = useState(true);
  const [written, setWritten] = useState(true);
  const [isQuizStart, setIsQuizStart] = useState(true);
  const [focusOn, setFocusOn] = useState(false);

  const toggleTrueFalse = () => {
    setTrueFalse((isEnabled) => !isEnabled);
    console.log("toggleSwitch");
  };
  const toggleWritten = () => {
    setWritten((isEnabled) => !isEnabled);

    console.log("toggleSwitch");
  };
  const toggleMultipleChoice = () => {
    setMultipleChoice((isEnabled) => !isEnabled);

    console.log("toggleSwitch");
  };

  const handleStart = () => {
    onStartQuiz(trueFalse, multipleChoice, written);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          // justifyContent: "space-between",
          // gap: 20,
          paddingBottom: 10,

          // backgroundColor: "pink",
        }}
      >
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.folderTitle}>{keyTopic.folderid.name}</Text>
            <Text style={styles.topicTitle}>{keyTopic.name}</Text>
          </View>

          <View style={styles.imageContainer}>
            <LumiQuizSetup
            // height={100}
            />
          </View>
        </View>

        {/* <View style={styles.imageContainer}>
          <LumiQuizSetup
          // height={100}
          />
        </View> */}
        <View style={styles.setup}>
          <View
            style={{
              ...styles.switchContainer,
              marginBottom: 40,
              marginTop: 20,
            }}
          >
            <Text style={styles.label}>Focus mode</Text>
            <Switch
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              value={focusOn}
              onValueChange={() => setFocusOn(!focusOn)}
              style={{
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
            />
          </View>

          <Text style={styles.subTitle}>Set Up Your Quiz</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>True/False</Text>
            <Switch
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              onValueChange={toggleTrueFalse}
              value={trueFalse}
              style={{
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Multiple Choice</Text>
            <Switch
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              onValueChange={toggleMultipleChoice}
              value={multipleChoice}
              style={{
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Written</Text>
            <Switch
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              onValueChange={toggleWritten}
              value={written}
              style={{
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
            />
          </View>
        </View>
      </View>
      <Pressable onPress={() => handleStart()} style={styles.button}>
        {({ pressed }) => (
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>
            Start Quiz
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // paddingHorizontal: 40,
    marginTop: 10,
  },
  headerContainerText: {
    fontSize: 54,
    fontFamily: "Gabarito-Bold",
    lineHeight: 54,
  },
  headerContainer: {
    width: "100%",
    // height: 200,
    maxHeight: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    borderRadius: 20,
  },
  folderTitle: {
    textAlign: "auto",
    fontFamily: "Gabarito-Bold",
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  topicTitle: {
    textAlign: "auto",
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    marginTop: 0,
    textAlign: "center",
  },

  setup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "start",
    gap: 0,
    justifyContent: "flex-start",
  },
  subTitle: {
    textAlign: "left",
    fontFamily: "Gabarito-Bold",
    fontSize: 22,
    marginBottom: 20,
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    color: "#262626",
    fontSize: 18,
    fontFamily: "Nunito-Regular",
  },
  instructions: {
    textAlign: "center",
    fontSize: 16,
    // marginBottom: 80,
  },
  button: {
    color: "#fff",
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPressed: {
    color: "grey",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizSetupView;
