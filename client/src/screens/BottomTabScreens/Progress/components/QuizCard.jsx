import { View, Text, StyleSheet } from "react-native";

const QuizCard = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: `${item?.score === 100 ? "#7000FF" : "#FFFF"}`,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#7000FF",
      padding: 14,
      gap: 5,
    },
    score: {
      fontFamily: "Gabarito-Bold",
      fontSize: 24,
      color: "#262626",
    },
    txt: {
      fontFamily: "Gabarito-Regular",
      fontSize: 14,
      color: "#262626",
    },
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.txt,
          color: `${item?.score === 100 ? "white" : "#262626"}`,
        }}
      >
        You Scored
      </Text>
      <Text
        style={{
          ...styles.score,
          color: `${item?.score === 100 ? "white" : "#262626"}`,
        }}
      >
        {item?.score}%
      </Text>
      <Text
        style={{
          ...styles.txt,
          color: `${item?.score === 100 ? "white" : "#262626"}`,
        }}
      >
        on {item?.duedate}
      </Text>
    </View>
  );
};

export default QuizCard;
