import { View, Text, StyleSheet } from "react-native";

const Daily = () => {
  return (
    <View style={styles.container}>
      <Text>Daily</Text>
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

export default Daily;
