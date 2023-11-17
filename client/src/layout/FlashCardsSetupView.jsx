import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { useState } from "react";
import FlashCardsCharacter from "../../assets/images/characters/flashcards-character.svg";
import { globalStyles } from "../../assets/common/global-styles";
import { useDispatch, useSelector } from "react-redux";

const FlashCardsSetupView = ({ onStartPracticing, keyTopic, handleClose }) => {
  const [termFirst, setTermFirst] = useState(true);
  const [focusOn, setFocusOn] = useState(false);
  const cards = useSelector((state) => state.flashCards.cards);

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

      <View style={{ ...styles.switchContainer, marginBottom: 40 }}>
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

      {cards && cards.length ? (
        <View style={styles.setup}>
          <Text style={styles.subTitle}>Set Up Your Flash Cards</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Term first</Text>
            <Switch
              style={{
                marginVertical: Platform.OS === "android" ? -10 : 0,
                padding: 0,
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              onValueChange={toggleSwitch}
              value={termFirst}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Definition first</Text>
            <Switch
              style={{
                marginVertical: Platform.OS === "android" ? -10 : 0,
                padding: 0,
                transform:
                  Platform.OS === "ios" ? [{ scale: 0.8 }] : [{ scale: 1 }],
              }}
              trackColor={{ false: "grey", true: globalStyles.colors.primary }}
              thumbColor={"white"}
              onValueChange={toggleSwitch}
              value={!termFirst}
            />
          </View>
        </View>
      ) : (
        <View style={styles.setup}>
          <Text style={styles.subTitle}>
            No Flashcards available for this topic.
          </Text>
        </View>
      )}

      {cards && cards.length ? (
        <Pressable
          onPress={() => handleStart()}
          style={({ pressed }) =>
            pressed
              ? { ...styles.button, ...styles.buttonPressed }
              : styles.button
          }
          disabled={!cards.length}
        >
          <Text style={styles.buttonText}>Start Practicing</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
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
    paddingBottom: 30,
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 40,
    zIndex: 1,
    position: "relative",
  },
  headerContainerText: {
    fontSize: 64,
    fontFamily: "Gabarito-Bold",
    lineHeight: 64,
  },
  imageContainer: {
    width: "100%",
    maxHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    position: "relative",
    top: -30,
    marginBottom: -20
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
    textAlign: "left",
    fontFamily: "Gabarito-Bold",
    fontSize: 22,
    marginBottom: 30,
  },
  switchContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 0,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    margin: 0,
    padding: 0,
  },
  instructions: {
    textAlign: "right",
    fontSize: 16,
    marginBottom: 80,
  },
  button: {
    position: "absolute",
    bottom: 100,
    marginBottom: 8,
    color: "#fff",
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 30,
  },
  buttonPressed: {
    backgroundColor: globalStyles.colors.buttonPressed
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
