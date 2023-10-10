import { View, Text, StyleSheet } from "react-native";

const Progress = () => {
  return (
    <View style={styles.container}>
      <Text>Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Progress;
