import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const QuestionFirstView = ({ isFlipped, details }) => {
  return (
    <View style={styles.container}>
      {isFlipped ? (
        <View>
          <Text style={styles.textContainer}>{details?.correctanswer[0]}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.textContainer}>{details?.question[0]}</Text>
        </View>
      )}
    </View>
  );
};

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

export default QuestionFirstView;
