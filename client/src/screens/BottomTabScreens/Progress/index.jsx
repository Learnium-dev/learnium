// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";

// Redux
import { useSelector } from "react-redux";

// Components
import KeyTopicCard from "./components/KeyTopicCard";

// Styles
import { styles } from "../Progress/styles/indexStyles";

// SVGs
import LumiBody from "../../../../assets/images/progress/lumi banner/lumi_body.svg";
import LumiText from "../../../../assets/images/progress/lumi banner/lumi_message.svg";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Progress Bar
import ProgressBarAnimated from "react-native-progress-bar-animated";

const Progress = () => {
  const { email } = useSelector((state) => state.credentials);

  // 1. Fetch all quizzes due today

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Today's Progress</Text>
        </View>
        {/* Banner */}
        <View style={styles.banner}>
          <LumiBody width={88} height={110} />
          <LumiText width={280} height={110} />
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <ProgressBarAnimated
            width={wp("90%")}
            height={40}
            value={50}
            backgroundColor={"#7000FF"}
            borderRadius={100}
            useNativeDriver={true}
            borderColor={"#ECECEC"}
            borderWidth={2}
          />
          <Text style={styles.progressText}>50%</Text>
        </View>
        <View style={styles.divider} useNativeDriver={true} />
        {/* In Progress */}
        <View>
          <Text style={styles.subtitle}>In Progress</Text>
          {/* Card */}
          <KeyTopicCard />
        </View>
        {/* This section should be a FlatList - Completed */}
        <View>
          <Text style={{ ...styles.subtitle, color: "#7000FF" }}>
            Completed
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
