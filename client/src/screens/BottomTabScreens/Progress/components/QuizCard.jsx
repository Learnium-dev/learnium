import { View, Text, StyleSheet } from "react-native";

// helpers
import { formatDate } from "../../../../../utils/helpers";

const QuizCard = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: `${item?.progress === 100 ? "#7000FF" : "#FFFF"}`,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#7000FF",
      padding: 10,
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
          color: `${item?.progress === 100 ? "white" : "#262626"}`,
        }}
      >
        You Scored
      </Text>
      <Text
        style={{
          ...styles.score,
          color: `${item?.progress === 100 ? "white" : "#262626"}`,
        }}
      >
        {item?.progress}%
      </Text>
      <Text
        style={{
          ...styles.txt,
          color: `${item?.progress === 100 ? "white" : "#262626"}`,
        }}
      >
        on {formatDate(item?.duedate)}
      </Text>
    </View>
  );
};

export default QuizCard;
