// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";

// React
import { useState, useEffect, useRef } from "react";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// Components
import KeyTopicCard from "./components/KeyTopicCard";

// Styles
import { styles } from "../Progress/styles/indexStyles";

// SVGs
import LumiBody from "../../../../assets/images/progress/lumi banner/lumi_body.svg";
import LumiText from "../../../../assets/images/progress/lumi banner/lumi_message.svg";

//Another way to fetch key topics from the API and filter by progress
import { getKeyTopics } from "../../../services/keyTopicsService";
import { useDispatch } from "react-redux";
import { setEmail, setToken } from "../../../../slices/credentialsSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Progress = () => {
  const barWidth = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [keyTopics, setKeyTopics] = useState([]);
  const [isKeyTopicsLoaded, setIsKeyTopicsLoaded] = useState(false);
  const [progress, setProgress] = useState(1);
  const { navigate } = useNavigation();

  useEffect(() => {
    // Get token
    AsyncStorage.getItem("jwt").then((token) => {
      if (token) {
        dispatch(setToken(token));

        // Get email
        AsyncStorage.getItem("email").then((email) => {
          if (email) {
            dispatch(setEmail(email));
          }
        });
      }
    });
    loadKeyTopics();
  }, []);

  useEffect(() => {
    Animated.spring(barWidth, {
      toValue: width * (progress / 100),
      bounciness: 10,
      useNativeDriver: false,
      speed: 2,
    }).start();
  }, [progress]);

  const loadKeyTopics = () => {
    getKeyTopics().then(
      (keyTopics) => {
        setKeyTopics(keyTopics);
        setIsKeyTopicsLoaded(true);

        const inProgressData = keyTopics.filter(
          (keyTopic) => keyTopic.progress < 100
        );
        const completedData = keyTopics.filter(
          (keyTopic) => keyTopic.progress === 100
        );

        setInProgress(inProgressData);
        setCompleted(completedData);

        const totalTasks = inProgressData.length + completedData.length || 1;
        const calculatedProgress = (
          (completedData.length / totalTasks) *
          100
        ).toFixed(0);
        setProgress(calculatedProgress || 1);
      },
      (error) => {
        alert("Error", `Couldn't load Key Topics! ${error}`);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 50,
        }}
      >
        <View>
          <Text style={styles.title}>Today's Progress</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <LumiBody width={88} height={110} />
          <LumiText width={"70%"} height={110} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={{ ...styles.progressBar, width: barWidth }} />
          <Text
            style={{
              ...styles.progressText,
              color: `${progress <= 10 ? "black" : "white"}`,
            }}
          >
            {progress}%
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* In Progress */}
        <View>
          <Text style={styles.subtitle}>In Progress</Text>
          <FlatList
            scrollEnabled={false}
            data={inProgress}
            renderItem={({ item }) => <KeyTopicCard item={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
        {/* Completed */}
        <View>
          <Text style={{ ...styles.subtitle, color: "#7000FF" }}>
            Completed
          </Text>
          <FlatList
            scrollEnabled={false}
            data={completed}
            renderItem={({ item }) => <KeyTopicCard item={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
        <Pressable style={styles.btn} onPress={() => navigate("AllMaterials")}>
          <Text style={styles.btnText}>All Material's Progress</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
