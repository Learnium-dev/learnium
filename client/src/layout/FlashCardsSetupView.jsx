import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { useState } from "react";
import FlashCardsCharacter from '../../assets/images/characters/flashcards-character.svg'
import { globalStyles } from "../../assets/common/global-styles";

const FlashCardsSetupView = ({ onStartPracticing, keyTopic }) => {

  const [termFirst, setTermFirst] = useState(true);
  
  const toggleSwitch = () => setTermFirst(isEnabled => !isEnabled);

  const handleStart = () => {
    onStartPracticing(termFirst);
  }

  return (
    <View style={styles.container}>

      
      <View style={styles.headerContainer}>
        <FlashCardsCharacter />
        <View style={{flex: 1}}>
          <Text style={styles.headerContainerText}>Study Time</Text>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Text style={styles.topicTitle}>{keyTopic.name}</Text>
        <Text style={styles.topicSummary}>{keyTopic.summary}</Text>
      </View>

      <View style={styles.setup}>
        <Text style={styles.subTitle}>
          Set Up Your Flash Cards
        </Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Term first</Text>
          <Switch
            style={{transform: [{ scale: 0.8 }]}}
            trackColor={{false: 'grey', true: globalStyles.colors.primary}}
            onValueChange={toggleSwitch}
            value={termFirst}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Definition first</Text>
          <Switch
            style={{transform: [{ scale: 0.8 }]}}
            trackColor={{false: 'grey', true: globalStyles.colors.primary}}
            onValueChange={toggleSwitch}
            value={!termFirst}
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
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  headerContainerText: {
    fontSize: 54,
    fontFamily: "Gabarito-Bold",
    lineHeight: 54,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
  },
  topicTitle: {
    textAlign: "auto",
    fontFamily: "Gabarito-Bold",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  topicSummary: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginBottom: 20,
  },
  setup: {
    width: "100%",
    alignItems: "start"
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Gabarito-Bold",
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
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  instructions: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 80,
  },
  button: {
    marginTop: 'auto',
    color: '#fff',
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gabarito-Bold',
  },
  buttonTextPressed: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default FlashCardsSetupView;
