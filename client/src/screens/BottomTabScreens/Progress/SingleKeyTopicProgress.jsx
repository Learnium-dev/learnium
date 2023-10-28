import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// icons
import ArrowBack from "../../../../assets/icons/arrow_back.svg";
import Badge from "../../../../assets/icons/badge.svg";
import Calendar from "../../../../assets/icons/calendar.svg";

// svgs
import LumiGrade from "../../../../assets/images/progress/grades/overall/lumi_bPlus.svg";
import CheckOn from "../../../../assets/icons/checkOn.svg";
import CheckOff from "../../../../assets/icons/checkOff.svg";

// styles
import { styles } from "../Progress/styles/singleKeyTopicStyles";

// helpers
import baseURL from "../../../../assets/common/baseUrl";

// components
import QuizCard from "../Progress/components/QuizCard";

// Axios
import axios from "axios";

const CustomHeader = ({ title, subtitle }) => (
  <View style={{ display: "flex" }}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>From {subtitle}</Text>
  </View>
);

const SingleKeyTopicProgress = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.credentials);
  const [quizzes, setQuizzes] = useState([]);
  const route = useRoute();
  const { name, materialName, id, duedate } = route.params;
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async (jwtToken) => {
      try {
        const response = await axios.get(`${baseURL}quizzes?keytopicid=${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log("These are the quizzes: ", response.data);
        setQuizzes(response.data);
        setHighestScore(
          response.data.reduce(
            (max, quiz) => (quiz.progress > max ? quiz.progress : max),
            0
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizzes(token);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} />
        </Pressable>
        <CustomHeader title={name} subtitle={materialName} />
      </View>
      {/* Banner */}
      <View style={styles.banner}>
        <LumiGrade width={200} height={190} />
        <View style={{ width: 160 }}>
          <Text style={styles.bannerText}>
            Complete this topic with an average of B+ or higher in at least
            three quizzes
          </Text>
          <View style={styles.checkMarksContainer}>
            {quizzes
              .sort((a, b) => b.progress - a.progress)
              .map((quiz) =>
                quiz.progress >= 85 ? (
                  <CheckOn width={40} height={40} />
                ) : (
                  <CheckOff width={40} height={40} />
                )
              )}
          </View>
        </View>
      </View>
      {/* Info of KeyTopic */}
      <View style={styles.containerInfo}>
        <View style={styles.subContainerInfo}>
          <Calendar width={50} height={50} />
          <View>
            <Text style={styles.subContainerInfoTitle}>Due Date</Text>
            <Text style={styles.subContainerInfoText}>{duedate}</Text>
          </View>
        </View>
        <View style={styles.subContainerInfo}>
          <Badge width={41} height={52} />
          <View>
            <Text style={styles.subContainerInfoTitle}>Best Score</Text>
            <Text style={styles.subContainerInfoText}>{highestScore}%</Text>
          </View>
        </View>
      </View>
      {/* Quiz History */}
      <View>
        <Text style={{ ...styles.title, color: "#7000FF" }}>Quiz History</Text>
        <FlatList
          horizontal={true}
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginVertical: 15,
          }}
          data={quizzes}
          renderItem={({ item }) => <QuizCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Buttons */}
      <Pressable
        style={{
          ...styles.btn,
          backgroundColor: "#FFF",
          borderColor: "#7000FF",
        }}
      >
        <Text style={{ ...styles.btnText, color: "#7000FF" }}>Study</Text>
      </Pressable>
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Start a Quiz</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SingleKeyTopicProgress;
