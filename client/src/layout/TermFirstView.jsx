import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TermFirstView = ({ isFlipped, details, answer, onAnswer, aiFeedback, aiResponse, feedbackLoading }) => {

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isFlipped ? "white" : globalStyles.colors.primary,
      }}
    >
      <TextInput style={styles.invisibleInput} editable={false} />
      {isFlipped ? (
        <View style={styles.cardContent}>
          <Text
            style={{
              ...styles.definitionContainer,
              color: isFlipped ? globalStyles.colors.primary : "white",
            }}
          >
            {details?.correctanswer[0]}
          </Text>

          {answer && (
            <View style={{ marginTop: 40 }}>
              <Text style={styles.primaryLabelText}>You answered:</Text>
              <Text style={styles.regularText}>{answer}</Text>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
            {(feedbackLoading || aiFeedback) && (
              <Text style={styles.primaryLabelText}>AI Assistant feedback</Text>
            )}
            {feedbackLoading && <Text>Loading...</Text>}
            {!feedbackLoading && aiResponse && (
              <Text style={styles.regularText}>{aiResponse}</Text>
            )}
            {/* Using multiline TextInput to make sure AI answer fits in card, it can be scrolled if there is a lot of text */}
            {!feedbackLoading && aiFeedback && (
              <ScrollView style={{ height: 140, width: "100%", marginTop: 10 }}>
                <TextInput
                  numberOfLines={15}
                  multiline={true}
                  style={styles.regularText}
                >
                  {aiFeedback}
                </TextInput>
              </ScrollView>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.cardContent}>
          <Text style={styles.termContainer}>{details?.question}</Text>
          <Text style={styles.labelText}>Definition</Text>
          <View style={{ height: 100, width: "100%" }}>
            <TextInput
              editable
              multiline={true}
              numberOfLines={4}
              maxLength={500}
              onChangeText={(text) => onAnswer(text)}
              value={answer}
              style={styles.textInput}
              placeholder={"Write your definition here"}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    padding: 10,
  },
  cardContent: {
    width: "100%",
  },
  termContainer: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Gabarito-Bold",
    color: "white",
  },
  labelText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Gabarito-Bold",
    color: "white",
  },
  primaryLabelText: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Gabarito-Bold",
    color: globalStyles.colors.primary,
  },
  definitionContainer: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
  },
  regularText: {
    fontFamily: "Nunito-Regular",
    textAlignVertical: "top",
  },
  textInput: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    textAlignVertical: "top",
    fontFamily: "Nunito-Regular",
  },
  invisibleInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "110%",
    height: "110%",
  },
});

export default TermFirstView;
