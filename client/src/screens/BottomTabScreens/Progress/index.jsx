// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
  FlatList,
} from "react-native";

// React
import { useState, useEffect } from "react";

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

// fake data
import { keyTopics } from "./fakeData";

const Progress = () => {
  const { email } = useSelector((state) => state.credentials);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const progress = (completed.length * 100) / keyTopics.length;

  useEffect(() => {
    const fetchKeyTopics = () => {
      const response = keyTopics;
      setInProgress(response.filter((topic) => topic.progress < 100));
      setCompleted(response.filter((topic) => topic.progress === 100));
    };
    fetchKeyTopics();
  }, []);

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
            value={progress}
            backgroundColor={"#7000FF"}
            borderRadius={100}
            useNativeDriver={false}
            borderColor={"#ECECEC"}
            borderWidth={2}
          />
          <Text
            style={{
              ...styles.progressText,
              color: `${progress <= 10 ? "black" : "white"}`,
            }}
          >
            {progress}%
          </Text>
        </View>
        <View style={styles.divider} useNativeDriver={false} />
        {/* In Progress */}
        <View>
          <Text style={styles.subtitle}>In Progress</Text>
          <FlatList
            scrollEnabled={false}
            data={inProgress}
            renderItem={({ item }) => <KeyTopicCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        {/* This section should be a FlatList - Completed */}
        <View>
          <Text style={{ ...styles.subtitle, color: "#7000FF" }}>
            Completed
          </Text>
          <FlatList
            scrollEnabled={false}
            data={completed}
            renderItem={({ item }) => <KeyTopicCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>All Material's Progress</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
