import { View, Text, Pressable } from "react-native";

// Styles
import { styles } from "../styles/keyTopicStyles";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Functions
import { getLumi } from "../../../../../utils/getLumi";

const KeyTopicCard = ({ item }) => {
  const { navigate } = useNavigation();

  const accentColor = (progress) => {
    if (progress >= 85) {
      return "#7000FF";
    } else if (progress < 85 && progress > 0) {
      return "#FF4C4C";
    } else {
      return "#5F5F5F";
    }
  };

  return (
    <Pressable
      onPress={() =>
        navigate("SingleKeyTopic", {
          name: item?.name,
          materialName: item?.materialName,
          id: item?.id,
        })
      }
    >
      <View
        style={{ ...styles.card, borderColor: accentColor(item?.progress) }}
      >
        <Text
          style={{ ...styles.cardTitle, color: accentColor(item?.progress) }}
        >
          {item?.name}
        </Text>
        <Text style={styles.cardSubtitle}>From: {item?.materialName}</Text>
        <Text style={styles.cardDueDate}>Due Date: {item?.duedate}</Text>
        <View style={styles.cardCharacter}>{getLumi(item?.progress)}</View>
      </View>
    </Pressable>
  );
};

export default KeyTopicCard;
