import { View, Text } from "react-native";

// Progress Circle
import * as Progress from "react-native-progress";

const MaterialCard = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#7000FF",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Progress.Circle
        fill="white"
        size={60}
        indeterminate={false}
        borderWidth={10}
        progress={0.5}
        showsText={true}
      />

      <View>
        <Text>World War II History</Text>
        <Text>Exam Date: Dec 20, 2023</Text>
      </View>
    </View>
  );
};

export default MaterialCard;
