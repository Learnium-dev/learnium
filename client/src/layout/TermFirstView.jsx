import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import { useState } from "react";

const TermFirstView = ({ isFlipped, details, answer, onAnswer }) => {

  return (
    <View style={styles.container}>
      {isFlipped ? (
        <View style={styles.cardContent}>
          <Text style={{
            ...styles.definitionContainer,
            color: isFlipped ? 'white': globalStyles.colors.primary
          }}>
            {details?.question}
          </Text>

          { answer && <View style={{ marginTop: 40}}>
            <Text style={{color: 'white', fontSize: 18, fontFamily: 'Gabarito-Bold'}}>You answered:</Text>
            <Text style={{color: 'white', fontFamily: 'Nunito-Regular'}}>{answer}</Text>
          </View>}

        </View>
      ) : (
        <View style={styles.cardContent}>
          <Text style={styles.termContainer}>{details?.correctanswer[0]}</Text>
          <Text style={styles.labelText}>
              Definition
            </Text>
          <View style={{ height: 100, width: '100%' }}>
            <TextInput
              editable
              multiline={true}
              numberOfLines={4}
              maxLength={40}
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
    borderRadius: 20,
    padding: 10,
  },
  cardContent: {
    width: "100%",
  },
  termContainer: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Gabarito-Bold",
  },
  labelText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Gabarito-Bold",
    color: globalStyles.colors.primary,
  },
  definitionContainer: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito-Regular",
  },
  textInput: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: globalStyles.colors.primary,
    borderRadius: 10,
    textAlignVertical: "top",
  },
});

export default TermFirstView;
