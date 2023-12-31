import { View, Text, Pressable } from "react-native";

// Styles
import { styles } from "../styles/keyTopicStyles";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Functions
import { getLumi } from "../../../../../utils/getLumi";

// Helpers
import { formatDate } from "../../../../../utils/helpers";

const KeyTopicCard = ({ item }) => {
  const { navigate } = useNavigation();

  const getSleepingCharacterStyle = (progress) => {
    if (progress === 0) {
      return { right: -25, bottom: -45 };
    } else {
      return {};
    }
  };

  const accentColor = (progress) => {
    if (progress >= 66.66) {
      return "#7000FF";
    } else if (progress < 66.66 && progress > 0) {
      return "#FF4C4C";
    } else {
      return "#5F5F5F";
    }
  };

  const accentColorBorder = (progress) => {
    if (progress >= 66.66) {
      return "#7000FF";
    } else if (progress < 66.66 && progress > 0) {
      return "#7A0000";
    } else {
      return "#5F5F5F";
    }
  };

  const setPositionLumi = (progress) => {
    if (progress === 99.99) {
      return {
        right: 0,
        bottom: 0,
      };
    } else if (progress <= 66.66 && progress > 33.33) {
      return {
        right: -30,
        bottom: -35,
      };
    } else {
      return {
        right: 0,
        bottom: 0,
      };
    }
  };

  return (
    <Pressable onPress={() => navigate("SingleKeyTopic", { keyTopic: item })}>
      <View
        style={{
          ...styles.card,
          borderColor: accentColorBorder(item?.progress),
        }}
      >
        <Text
          style={{
            ...styles.cardTitle,
            paddingRight: 70,
            color: accentColor(item?.progress),
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.name}
        </Text>
        <Text style={styles.cardSubtitle}>From: {item?.folderid?.name}</Text>
        <Text style={styles.cardDueDate}>
          Due Date: {formatDate(item?.duedate)}
        </Text>
        <View
          style={{
            ...styles.cardCharacter,
            ...setPositionLumi(item?.progress),
            ...getSleepingCharacterStyle(item?.progress),
          }}
        >
          {getLumi(item?.progress)}
        </View>
      </View>
    </Pressable>
  );
};

export default KeyTopicCard;
