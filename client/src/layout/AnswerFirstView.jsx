import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const AnswerFirstView = ({ isFlipped, details }) => {

  const [value, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      { isFlipped ?
        <View style={styles.container}>
          <Text style={styles.textContainer}>{details.question}</Text>
        </View> :
        <View>
          <Text style={styles.textContainer}>{details.correctanswer}</Text>
          <Text style={{ marginTop: 40, marginBottom: 10 }}>Your answer?</Text>
          <View style={{ height: 100 }}>
            <TextInput
              editable
              multiline={true}
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => onChangeText(text)}
              value={value}
              style={{padding: 10, backgroundColor: 'white', height: '100%'}}
              placeholder={'Write your answer here'}
            />
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  textContainer: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AnswerFirstView;