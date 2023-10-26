import { View, Text, Pressable } from "react-native";

// Styles
import { styles } from "../styles/indexStyles";

// Navigation
import { useNavigation } from "@react-navigation/native";

const KeyTopicCard = () => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate("SingleKeyTopic")}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Key Topic Title Here</Text>
        <Text style={styles.cardSubtitle}>From: Material Title Here</Text>
        <Text style={styles.cardDueDate}>Due Date: Today</Text>
        <View style={styles.cardCharacter}></View>
      </View>
    </Pressable>
  );
};

export default KeyTopicCard;
