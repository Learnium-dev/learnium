import { View, Text, StyleSheet, Pressable } from "react-native";

// react navigation imports
import { useNavigation } from "@react-navigation/native";

const Study = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Study</Text>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("KeyTopic")}
      >
        <Text>Go to KeyTopic</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("AllMaterials")}
      >
        <Text>Go to AllMaterials</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("CreateNewMaterial")}
      >
        <Text>Go to CreateNewMaterial</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("NextDayPlan")}
      >
        <Text>Go to NextDayPlan</Text>
      </Pressable>
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

export default Study;
