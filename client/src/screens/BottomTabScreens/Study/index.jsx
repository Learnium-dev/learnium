import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import StudyScreenTabBar from "../../../components/StudyScreenTabBar";
import StudyTabView from "../../../layout/StudyTabView";
import { globalStyles } from "../../../../assets/common/global-styles";
import { getFirstName } from "../../../services/userService";
import { getKeyTopics } from "../../../services/keyTopicsService";
import { isBeforeToday, isToday } from "../../../../utils/helpers";

import { SafeAreaView } from "react-native-safe-area-context";

// react navigation imports
import { useNavigation } from "@react-navigation/native";

// react hooks
import { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setToken } from "../../../../slices/credentialsSlice";

// axios
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Study = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [isFirstNameLoaded, setIsFirstNameLoaded] = useState(false);
  const [keyTopics, setKeyTopics] = useState([]);
  const [isKeyTopicsLoaded, setIsKeyTopicsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(1); // default to today's content for tab view
  const [routes] = useState([
    { key: "missed", title: "Missed content" },
    { key: "today", title: "Today's content" },
    { key: "review", title: "Review content" },
  ]);


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
    loadUserFirstName();
    loadKeyTopics();
  }, []);

    const loadUserFirstName = async () => {
      getFirstName().then(
        (firstName) => {
          console.log("First name loaded", firstName);
          setFirstName(firstName);
          setIsFirstNameLoaded(true);
        },
        (error) => {
          alert("Error", `Couldn't load user's first name! ${error}`);
        }
      );
    };

  const loadKeyTopics = () => {
    getKeyTopics().then(
      (keyTopics) => {
        console.log("Key Topics loaded", keyTopics);
        setKeyTopics(keyTopics);
        setIsKeyTopicsLoaded(true);
      },
      (error) => {
        alert("Error", `Couldn't load Key Topics! ${error}`);
      }
    );
  };

  // TabView
  const layout = useWindowDimensions();
  const filteredKeyTopics = (routeKey) => {
    switch (routeKey) {
      case "missed":
        return keyTopics.filter((keyTopic) => isBeforeToday(keyTopic.duedate));
      case "today":
        return keyTopics.filter((keyTopic) => isToday(keyTopic.duedate));
      case "review":
        return keyTopics.filter((keyTopic) => keyTopic.progress > 0 && keyTopic.progress < 80);
      default:
        return keyTopics;
    }
  };

  const renderScene = ({ route }) =>
    StudyTabView({
      selectedView: route.key,
      keyTopics: filteredKeyTopics(route.key),
    });
  // const askAIprops = {
  //   askTopic: "key topic asked",
  //   questionAsk: "question that you get wrong",
  //   wrongAnswer: "here is your wrong answer",
  // };
  return (
    <SafeAreaView
      style={{
        ...styles.safeArea,
        fontFamily: globalStyles.fonts.gabaritoBold,
      }}
    >
      {/* <TouchableOpacity onPress={() => navigate("AskAI", askAIprops)}>
        <Text>AskAI</Text>
      </TouchableOpacity> */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          fontFamily: globalStyles.fonts.gabaritoBold,
        }}
      >
        <Text
          style={{
            fontFamily: globalStyles.fonts.gabaritoBold,
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Welcome back, {firstName || "User"}!
        </Text>
      </View>

      {isKeyTopicsLoaded && (
        <View style={styles.tabContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={StudyScreenTabBar}
          />
          <Pressable
            style={{
              ...globalStyles.buttons.primary,
              justifyContent: "center",
              marginBottom: 34,
            }}
            onPress={() => navigate("CreateContent")}
          >
            <Text style={globalStyles.buttons.primary.text}>
              Create New Learning Material
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingBottom: -34,
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  useName: {
    fontFamily: "Gabarito-Bold",
    fontSize: 24,
    // color: "#262626",
    lineHeight: 30,
  },
});

export default Study;
