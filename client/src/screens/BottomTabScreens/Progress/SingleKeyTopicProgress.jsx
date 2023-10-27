import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// React
import { useState, useEffect } from "react";

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
import { grade } from "../../../../utils/helpers";
import { quizzesData } from "./fakeData";

// components
import QuizCard from "../Progress/components/QuizCard";

const CustomHeader = ({ title, subtitle }) => (
  <View style={{ display: "flex" }}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>From {subtitle}</Text>
  </View>
);

const SingleKeyTopicProgress = () => {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const route = useRoute();
  const { name, materialName, id } = route.params;

  useEffect(() => {
    const fetchQuizzes = () => {
      const response = quizzesData;
      setQuizzes(response);
    };
    fetchQuizzes();
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
            <CheckOn width={40} height={40} />
            <CheckOn width={40} height={40} />
            <CheckOff width={40} height={40} />
          </View>
        </View>
      </View>
      {/* Info of KeyTopic */}
      <View style={styles.containerInfo}>
        <View style={styles.subContainerInfo}>
          <Calendar width={50} height={50} />
          <View>
            <Text style={styles.subContainerInfoTitle}>Due Date</Text>
            <Text style={styles.subContainerInfoText}>Nov 01, 2023</Text>
          </View>
        </View>
        <View style={styles.subContainerInfo}>
          <Badge width={41} height={52} />
          <View>
            <Text style={styles.subContainerInfoTitle}>Best Score</Text>
            <Text style={styles.subContainerInfoText}>98%</Text>
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
