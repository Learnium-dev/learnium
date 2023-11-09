import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../assets/common/global-styles";

const DefinitionFirstView = ({ isFlipped, details, answer, onAnswer }) => {

  // const [value, onChangeText] = useState('');

  return (
    <View style={styles.mainContainer}>
      {isFlipped ? (
        <View style={styles.container}>
          <Text style={{
            ...styles.textContainer,
            color: isFlipped ? 'white': globalStyles.colors.primary
          }}>
            {details.correctanswer[0]}
          </Text>

          { answer && <View style={{ marginTop: 40, width: '100%'}}>
            <Text style={{color: 'white', fontSize: 18, fontFamily: 'Gabarito-Bold'}}>You answered:</Text>
            <Text style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Regular'}}>{answer}</Text>
          </View> }

        </View>
      ) : (
        <View style={{width: '100%'}}>
          <Text style={styles.definitionContainer}>{details.question}</Text>
          <Text style={{ marginTop: 40, marginBottom: 10, fontSize: 18, fontFamily: 'Gabarito-Bold', color: globalStyles.colors.primary }}>Term</Text>
          <View style={{ height: 100, width: '100%' }}>
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
  },
  definitionContainer: {
    fontSize: 16,
    textAlign: "left",
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
    textAlignVertical: "top"
  }
});

export default DefinitionFirstView;