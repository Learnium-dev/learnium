import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// icons
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
import { getLumiOverall } from "../../../../utils/getLumiOverall";

// components
import QuizCard from "../Progress/components/QuizCard";

// helpers
import { formatDate } from "../../../../utils/helpers";

// Axios
import axios from "axios";
import Header from "./components/Header";
import { ScrollView } from "react-native-gesture-handler";

const SingleKeyTopicProgress = (props) => {
  const { token } = useSelector((state) => state.credentials);
  const [quizzes, setQuizzes] = useState([]);
  const { keyTopic } = props.route.params;
  const [highestScore, setHighestScore] = useState(0);
  const [average, setAverage] = useState(0);
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchQuizzes = async (jwtToken) => {
      try {
        const response = await axios.get(
          `${baseURL}historyquizzes?keytopicid=${keyTopic?._id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setQuizzes(response?.data);

        if (response?.data.length < 3) {
          const newQuizzes = Array.from(
            { length: 3 - response?.data.length },
            (_, index) => ({
              id: index,
              progress: 0,
            })
          );
          setQuizzes([...response?.data, ...newQuizzes]);
        }

        // Calculate the average of quizzes
        let totalProgress = response.data.reduce(
          (sum, quiz) => sum + quiz.progress,
          0
        );
        const averageProgress = totalProgress / response.data.length;

        setAverage(averageProgress);
        console.log("THIS IS THE AVERAGE: ", average);

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
    <SafeAreaView style={{ ...styles.container }}>
      <View style={{ padding: 20, flex: 1 }}>
        {/* Header */}
        <Header name={keyTopic?.name} materialName={keyTopic?.folderid?.name} />

        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner */}
          <View style={styles.banner}>
            {getLumiOverall(average)}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text style={styles.bannerText}>
                Complete this topic with an average of B+ or higher in at least
                three quizzes
              </Text>
              <View style={styles.checkMarksContainer}>
                {quizzes && quizzes.length > 0
                  ? quizzes
                      .sort((a, b) => b.progress - a.progress)
                      .slice(0, 3)
                      .map((quiz) =>
                        quiz.progress >= 85 ? (
                          <CheckOn key={quiz.id} width={40} height={40} />
                        ) : (
                          <CheckOff key={quiz.id} width={40} height={40} />
                        )
                      )
                  : Array.from({ length: 3 }, (_, index) => (
                      <CheckOff key={index} width={40} height={40} />
                    ))}
              </View>
            </View>
          </View>

          {/* Info of KeyTopic */}
          <View style={styles.containerInfo}>
            <View style={styles.subContainerInfo}>
              <Calendar width={40} height={40} />
              <View>
                <Text style={styles.subContainerInfoTitle}>Due Date</Text>
                <Text style={styles.subContainerInfoText}>
                  {formatDate(keyTopic?.duedate)}
                </Text>
              </View>
            </View>
            <View style={styles.subContainerInfo}>
              <Badge width={31} height={42} />
              <View>
                <Text style={styles.subContainerInfoTitle}>Best Score</Text>
                <Text style={styles.subContainerInfoText}>{highestScore}%</Text>
              </View>
            </View>
          </View>

          {/* Quiz History */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ ...styles.title, color: "#7000FF" }}>
              Quiz History
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* <FlatList
                horizontal={true}
                contentContainerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 10,
                  width: "100%",
                  marginVertical: 15,
                }}
                data={quizzes}
                renderItem={({ item, index }) => {
                  if (item?.progress > 0) {
                    return <QuizCard item={item} index={index} />;
                  }
                }}
                keyExtractor={(item) => item.id}
              /> */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 10,
                  width: "100%",
                  marginVertical: 15,
                }}
              >
                {quizzes.map((item, index) => {
                  if (item?.progress > 0) {
                    return <QuizCard key={item.id} item={item} index={index} />;
                  }
                  return null; // Ensure you return null for items you don't want to render
                })}
              </View>
            </ScrollView>
          </View>

          {/* Buttons */}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Pressable
              onPress={() => navigate("KeyTopic", { keyTopic })}
              style={{
                ...styles.btn,
                backgroundColor: "#FFF",
                borderColor: "#7000FF",
              }}
            >
              <Text style={{ ...styles.btnText, color: "#7000FF" }}>Study</Text>
            </Pressable>
            <Pressable
              onPress={() => navigate("KeyTopic", { keyTopic })}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Start a Quiz</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SingleKeyTopicProgress;
