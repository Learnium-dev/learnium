import { View, Text, StyleSheet } from "react-native";

const AllMaterials = () => {
  return (
    <View style={styles.container}>
      <Text>AllMaterials</Text>
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

export default AllMaterials;
