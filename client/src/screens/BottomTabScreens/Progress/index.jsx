// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
  FlatList,
  StyleSheet
} from "react-native";

// Base URL
import baseUrl from "../../../../assets/common/baseUrl";

// React
import { useState, useEffect } from "react";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";

// Components
import KeyTopicCard from "./components/KeyTopicCard";

// Styles
import { styles } from "../Progress/styles/indexStyles";

// SVGs
import LumiBody from "../../../../assets/images/progress/lumi banner/lumi_body.svg";
import LumiText from "../../../../assets/images/progress/lumi banner/lumi_message.svg";

// Progress Bar
import { Bar } from "react-native-progress";

// Axios
import axios from "axios";

// Helpers
import { getFormattedTodayDate } from "../../../../utils/helpers";

//Another way to fetch key topics from the API and filter by progress
import { getKeyTopics } from "../../../services/keyTopicsService";
import { useDispatch } from "react-redux";
import { setEmail, setToken } from "../../../../slices/credentialsSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Progress = () => {
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.credentials);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [keyTopics, setKeyTopics] = useState([]);
  const [isKeyTopicsLoaded, setIsKeyTopicsLoaded] = useState(false);
  const [progress, setProgress] = useState(1);
  const { navigate } = useNavigation();

  // useEffect(() => {
  //   const fetchKeyTopics = async (jwtToken) => {
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}keytopics?email=${email}&startdate=${getFormattedTodayDate()}&enddate=${getFormattedTodayDate()}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         }
  //       );

  //       console.log("This is the data from the API: ", response.data);
  //       const inProgressData = response.data.filter(
  //         (topic) => topic.progress < 100
  //       );
  //       const completedData = response.data.filter(
  //         (topic) => topic.progress === 100
  //       );
  //       setInProgress(inProgressData);
  //       setCompleted(completedData);

  //       const totalTasks = inProgressData.length + completedData.length || 1;
  //       console.log("Total Tasks: ", totalTasks);
  //       const calculatedProgress = (
  //         (completedData.length / totalTasks) *
  //         100
  //       ).toFixed(0);
  //       setProgress(calculatedProgress || 1);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchKeyTopics(token);
  // }, []);

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

  const loadKeyTopics = () => {
    getKeyTopics().then(
      (keyTopics) => {
        console.log("Key Topics loaded", keyTopics);
        setKeyTopics(keyTopics);
        setIsKeyTopicsLoaded(true);

        const inProgressData = keyTopics.filter((keyTopic) => keyTopic.progress < 100);
        const completedData = keyTopics.filter(
          (keyTopic) => keyTopic.progress === 100
        );

        setInProgress(inProgressData);
        setCompleted(completedData);

        const totalTasks = inProgressData.length + completedData.length || 1;
        console.log("Total Tasks: ", totalTasks);
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
          <LumiText width={280} height={110} />
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Bar
            width={null}
            height={40}
            progress={progress / 100}
            color={"#7000FF"}
            borderRadius={100}
            useNativeDriver={false}
            unfilledColor={"#ECECEC"}
            borderWidth={0}
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
        <View style={styles.divider} />
        {/* In Progress */}
        <View>
          <Text style={styles.subtitle}>In Progress</Text>
          <FlatList
            scrollEnabled={false}
            data={inProgress}
            renderItem={({ item }) =>
              <KeyTopicCard
                item={item} />}
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
