import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

// helpers
import {
  grade,
  encourageMessage,
  todayProgress as calculateTodayProgress,
} from "../../../../utils/helpers";

const Progress = () => {
  const [keyTopics, setKeyTopics] = useState([]);
  const todayDate = "2023-10-10";
  const [progressData, setProgressData] = useState({
    progressPercentage: 0,
    averageProgress: 0,
  });

  useEffect(() => {
    const fetchTodayProgress = async () => {
      try {
        const { data } = await axios.get(
          `http://10.128.243.187:3000/api/v1/quizzes?duedate='${todayDate}'`
        );

        const uniqueTopicsMap = {};
        const topicCountMap = {};

        for (let item of data) {
          const topicName = item.keytopicid.name;

          if (uniqueTopicsMap[topicName] !== undefined) {
            uniqueTopicsMap[topicName].progress += item.progress;
            uniqueTopicsMap[topicName].numQuizzes += 1;
          } else {
            uniqueTopicsMap[topicName] = {
              name: topicName,
              progress: item.progress,
              numQuizzes: 1,
            };
          }
        }

        const uniqueTopicsArray = Object.values(uniqueTopicsMap).map(
          (topic) => ({
            name: topic.name,
            progress: topic.progress / topic.numQuizzes,
            numQuizzes: topic.numQuizzes,
          })
        );

        setKeyTopics(uniqueTopicsArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodayProgress();
  }, []);

  useEffect(() => {
    if (keyTopics.length > 0) {
      const progress = calculateTodayProgress(keyTopics);
      setProgressData(progress);
    }
  }, [keyTopics]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Progress</Text>
        <Text style={styles.subHeading}>
          Progress percentage {progressData.progressPercentage}%
        </Text>
        <Text style={styles.subHeading}>
          Encourage message: {encourageMessage(progressData.averageProgress)}
        </Text>
        {keyTopics.map((item, index) => (
          <View key={index} style={styles.contentContainer}>
            <Text style={styles.subheading}>{item.name}</Text>
            <Text>Grade: {grade(item.progress.toFixed(2))} </Text>
            <Text>Average Progress: {item.progress.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Progress;
