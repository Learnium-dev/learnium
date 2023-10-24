// React Native
import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";

// Styles
import { styles } from "../Progress/styles/indexStyles";

// SVGs
import ProgressBanner from "../../../../assets/images/progress/progressWelcome.svg";
import KeyTopicGrade from "../../../../assets/images/progress/keyTopicGrade.svg";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Progress Bar
import { Bar } from "react-native-progress";

const Progress = () => {
  return (
    <SafeAreaView style={styles.container}>
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
      {/* This section should be a FlatList */}
      <View>
        <Text style={styles.subtitle}>In Progress</Text>
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
    </SafeAreaView>
  );
};

export default Progress;
