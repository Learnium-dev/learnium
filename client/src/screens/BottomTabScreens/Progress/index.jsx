// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";

// Styles
import { styles } from "../Progress/styles/indexStyles";

// SVGs
import ProgressBanner from "../../../../assets/images/progress/progressWelcome.svg";
import KeyTopicGrade from "../../../../assets/images/progress/keyTopicGrade.svg";
import InactiveKeyTopic from "../../../../assets/images/progress/inactiveKeyTopic.svg";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Progress Bar
import { Bar } from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const Progress = () => {
  const { navigate } = useNavigation();
  // info to pullout from the backend (API)
  // 1. Progress Bar
  // a. GET all the quizzes due today (get their progress)
  // 2. All Key Topics with Due Date for Today
  // a. GET all the key topics due today (get their name, material name, progress)
  // 3. The most recent Key Topic completed
  // a. GET the most recent key topic completed (get their name, material name, due date and progress)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Today's Progress</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginVertical: 14,
          }}
        >
          <ProgressBanner width={331} height={110} />
        </View>
        <View style={{ position: "relative", marginBottom: 40 }}>
          <Bar
            progress={0.5}
            width={wp("90%")}
            height={hp("4%")}
            color="#7000FF"
            borderRadius={100}
          />
          <Text style={styles.progressText}>50%</Text>
        </View>
        {/* This section should be a FlatList - In Progress */}
        <View>
          <Text style={styles.subtitle}>In Progress</Text>
          {/* Card */}
          <Pressable onPress={() => navigate("SingleKeyTopic")}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Key Topic Title Here</Text>
              <Text style={styles.cardSubtitle}>From: Material Title Here</Text>
              <Text style={styles.cardDueDate}>Due Date: Today</Text>
              <View style={styles.cardCharacter}>
                <KeyTopicGrade width={145} height={127} />
              </View>
            </View>
          </Pressable>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Key Topic Title Here</Text>
            <Text style={styles.cardSubtitle}>From: Material Title Here</Text>
            <Text style={styles.cardDueDate}>Due Date: Today</Text>
            <View style={styles.cardCharacterInactive}>
              <InactiveKeyTopic width={114} height={133} />
            </View>
          </View>
        </View>
        {/* This section should be a FlatList - Completed */}
        <View>
          <Text style={styles.subtitle}>Completed</Text>
          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Key Topic Title Here</Text>
            <Text style={styles.cardSubtitle}>From: Material Title Here</Text>
            <Text style={styles.cardDueDate}>Due Date: Today</Text>
            <View style={styles.cardCharacter}>
              <KeyTopicGrade width={145} height={127} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Key Topic Title Here</Text>
            <Text style={styles.cardSubtitle}>From: Material Title Here</Text>
            <Text style={styles.cardDueDate}>Due Date: Today</Text>
            <View style={styles.cardCharacter}>
              <KeyTopicGrade width={145} height={127} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
