import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { useState } from "react";

const FlashCardsSetupView = ({ onStartPracticing }) => {

  const [questionFirst, setQuestionFirst] = useState(true);
  
  const toggleSwitch = () => setQuestionFirst(isEnabled => !isEnabled);

  const handleStart = () => {
    onStartPracticing(questionFirst);
  }

  return (
    <View style={styles.container}>

      {/* To be updated when design is finalised */}
      <View style={styles.imageContainer}>
        <Text style={styles.topicTitle}>Historical Dates</Text>
      </View>

      <View style={styles.setup}>
        <Text style={styles.subTitle}>
          Set Up Your Flash Cards
        </Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Question first</Text>
          <Switch
            trackColor={{false: 'grey', true: 'green'}}
            onValueChange={toggleSwitch}
            value={questionFirst}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Answer first</Text>
          <Switch
            trackColor={{false: 'grey', true: 'green'}}
            onValueChange={toggleSwitch}
            value={!questionFirst}
          />
        </View>
      </View>

      <Pressable onPress={() => handleStart()} style={styles.button}>
        {({pressed}) => (
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>Start Practicing</Text>
        )}
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 100
  },
  imageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
    borderWidth: 1,
    borderRadius: 20,
  },
  topicTitle: {
    textAlign: "auto",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
  setup: {
    width: "100%",
    alignItems: "start"
  },
  subTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 20,
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  label: {
    fontSize: 18,
  },
  instructions: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 80,
  },
  button: {
    marginTop: 'auto',
    color: '#fff',
    backgroundColor: 'black',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextPressed: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default FlashCardsSetupView;
