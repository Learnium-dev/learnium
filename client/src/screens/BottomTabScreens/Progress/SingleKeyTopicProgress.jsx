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

// components
import QuizCard from "../Progress/components/QuizCard";

// helpers
import { formatDate } from "../../../../utils/helpers";

// Axios
import axios from "axios";
import Header from "./components/Header";

const SingleKeyTopicProgress = (props) => {
  const { token } = useSelector((state) => state.credentials);
  const [quizzes, setQuizzes] = useState([]);
  // const route = useRoute();
  // const { name, materialName, id, duedate } = route.params;
  const { keyTopic } = props.route.params;
  const [highestScore, setHighestScore] = useState(0);
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
        // if (response.data.length < 3) {
        //   for (let i = response.data.length; i < 3; i++) {
        //     setQuizzes((prev) => [
        //       ...prev,
        //       { id: i, progress: 0, keytopicid: _id },
        //     ]);
        //   }
        // }
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
      <Header name={keyTopic?.name} materialName={keyTopic?.folderid?.name} />

      {/* Banner */}
      <View style={styles.banner}>
        <LumiGrade width={200} height={190} />
        <View style={{ width: 160 }}>
          <Text style={styles.bannerText}>
            Complete this topic with an average of B+ or higher in at least
            three quizzes
          </Text>
          <View style={styles.checkMarksContainer}>
            {quizzes && quizzes.length > 0
              ? quizzes
                  .sort((a, b) => b.progress - a.progress)
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
          <Calendar width={50} height={50} />
          <View>
            <Text style={styles.subContainerInfoTitle}>Due Date</Text>
            <Text style={styles.subContainerInfoText}>
              {formatDate(keyTopic?.duedate)}
            </Text>
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
            justifyContent: "flex-start",
            gap: 15,
            width: "100%",
            marginVertical: 15,
          }}
          data={quizzes}
          renderItem={({ item }) => {
            if (item?.progress > 0) {
              return <QuizCard item={item} />;
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Buttons */}
      {/* const { name, materialName, id, duedate } = route.params; */}

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
    </SafeAreaView>
  );
};

export default SingleKeyTopicProgress;
