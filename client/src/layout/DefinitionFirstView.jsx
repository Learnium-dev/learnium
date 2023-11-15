import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../../assets/common/global-styles";

const DefinitionFirstView = ({ isFlipped, details, answer, onAnswer, aiFeedback, aiResponse, feedbackLoading }) => {


  // const [aiFeedback, setAiFeedback] = useState(isCorrectFeedback);
  // console.log("🚀 ~ file: DefinitionFirstView.jsx:9 ~ aiFeedback:", aiFeedback)
  // const [aiResponse, setAiResponse] = useState(isCorrectResponse);
  // console.log("🚀 ~ file: DefinitionFirstView.jsx:11 ~ aiResponse:", aiResponse)

  
  // const [value, onChangeText] = useState('');

  return (
    <View style={styles.mainContainer}>
      <TextInput style={styles.invisibleInput} editable={false} />
      {isFlipped ? (
        <View style={styles.container}>
          <Text
            style={{
              ...styles.textContainer,
              color: isFlipped ? "white" : globalStyles.colors.primary,
            }}
          >
            {details.question}
          </Text>

          {answer && (
            <View style={{ marginTop: 40, width: "100%" }}>
              <Text style={styles.primaryLabelText}>You answered:</Text>
              <Text style={styles.regularText}>{answer}</Text>
            </View>
          )}

          <View style={{ marginTop: 20, height: 220 }}>
            {feedbackLoading && (
              <Text style={{ color: globalStyles.colors.primary }}>
                Loading...
              </Text>
            )}
            {!feedbackLoading && aiResponse && (
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  fontFamily: "Gabarito-Bold",
                  textAlign: "center",
                }}
              >
                {aiResponse}!
              </Text>
            )}

            {!feedbackLoading && aiFeedback && (
              <ScrollView style={{ width: "100%", marginTop: 15 }}>
                <Text style={styles.regularText}>{aiFeedback}</Text>
              </ScrollView>
            )}
          </View>
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <Text style={styles.definitionContainer}>
            {details.correctanswer[0]}
          </Text>
          <Text
            style={{
              marginTop: 40,
              marginBottom: 10,
              fontSize: 18,
              fontFamily: "Gabarito-Bold",
              color: globalStyles.colors.primary,
            }}
          >
            Term
          </Text>
          <View style={{ height: 100, width: "100%" }}>
            <TextInput
              editable
              multiline={true}
              numberOfLines={4}
              maxLength={40}
              onChangeText={(text) => onAnswer(text)}
              value={answer}
              style={styles.textInput}
              placeholder={"Write your term here"}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },
  container: {
    width: "100%",
  },
  textContainer: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Gabarito-Bold",
    paddingHorizontal: 10,
  },
  definitionContainer: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Nunito-Bold",
    color: globalStyles.colors.primary,
    paddingHorizontal: 10,
  },
  textInput: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: globalStyles.colors.primary,
    fontFamily: "Nunito-Regular",
    textAlignVertical: "top",
  },
  primaryLabelText: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Gabarito-Bold",
    color: "white",
  },
  regularText: {
    color: "white",
    fontFamily: "Nunito-Regular",
    textAlignVertical: "top",
  },
  invisibleInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "110%",
    height: "110%",
  },
});

export default DefinitionFirstView;