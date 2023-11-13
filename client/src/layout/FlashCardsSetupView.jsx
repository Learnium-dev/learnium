import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { useState } from "react";
import FlashCardsCharacter from "../../assets/images/characters/flashcards-character.svg";
import { globalStyles } from "../../assets/common/global-styles";

const FlashCardsSetupView = ({ onStartPracticing, keyTopic }) => {
  const [termFirst, setTermFirst] = useState(true);

  const toggleSwitch = () => setTermFirst((isEnabled) => !isEnabled);

  const handleStart = () => {
    onStartPracticing(termFirst);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FlashCardsCharacter />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerContainerText}>Study Time</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.folderTitle}>{keyTopic.folderid.name}</Text>
        <Text style={styles.topicTitle}>{keyTopic.name}</Text>
      </View>

      <View style={styles.setup}>
        <Text style={styles.subTitle}>Set Up Your Flash Cards</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Term first</Text>
          <Switch
            style={{
              transform: [{ scale: 1 }],
              // width: 50,
              // height: 30,
              margin: 0,
              padding: 0,
            }}
            trackColor={{ false: "grey", true: globalStyles.colors.primary }}
            thumbColor={termFirst ? "white" : "white"}
            trackHeight={30}
            onValueChange={toggleSwitch}
            value={termFirst}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Definition first</Text>
          <Switch
            style={{
              transform: [{ scale: 1 }],
              // width: 50,
              // height: 30,
              margin: 0,
              padding: 0,
            }}
            trackColor={{ false: "grey", true: globalStyles.colors.primary }}
            thumbColor={termFirst ? "white" : "white"}
            onValueChange={toggleSwitch}
            value={!termFirst}
          />
        </View>
      </View>

      <Pressable onPress={() => handleStart()} style={styles.button}>
        {({ pressed }) => (
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>
            Start Practicing
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 100,
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,

    paddingHorizontal: 40,
  },
  headerContainerText: {
    fontSize: 54,
    fontFamily: "Gabarito-Bold",
    lineHeight: 54,
  },
  imageContainer: {
    width: "100%",
    maxHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
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
  topicSummary: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    marginBottom: 20,
  },
  setup: {
    width: "100%",
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
  },
  subTitle: {
    textAlign: "flex-start",
    fontFamily: "Gabarito-Bold",
    fontSize: 22,
    marginBottom: 35,
  },
  switchContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    margin: 0,
    padding: 0,
  },
  instructions: {
    textAlign: "flex-end",
    fontSize: 16,
    marginBottom: 80,
  },
  button: {
    // marginTop: "auto",
    marginBottom: 8,
    color: "#fff",
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Gabarito-Bold",
  },
  buttonTextPressed: {
    color: "grey",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FlashCardsSetupView;
