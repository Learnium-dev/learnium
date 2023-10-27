import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import StudyScreenTabBar from "../../../components/StudyScreenTabBar";
import StudyTabView from "../../../layout/StudyTabView";
import { globalStyles } from "../../../../assets/common/global-styles";
import { getKeyTopics } from "../../../services/keyTopicsService";
import { isBeforeToday, isToday } from "../../../../utils/helpers";

// react navigation imports
import { useNavigation } from "@react-navigation/native";

// react hooks
import { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../../../slices/credentialsSlice";

// axios
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Study = () => {
  const { navigate } = useNavigation();
  const [keyTopics, setKeyTopics] = useState([]);
  const [isKeyTopicsLoaded, setIsKeyTopicsLoaded] = useState(false);
  const [index, setIndex] = useState(1); // default to today's content for tab view
  const [routes] = useState([
    { key: "missed", title: "Missed content" },
    { key: "today", title: "Today's content" },
    { key: "review", title: "Review content" },
  ]);

  useEffect(() => {
    loadKeyTopics();
  }, []);

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
        // TODO: implement review logic
        return [];
      default:
        return keyTopics;
    }
  };

  const renderScene = ({ route }) =>
    StudyTabView({
      selectedView: route.key,
      keyTopics: filteredKeyTopics(route.key),
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text>Welcome back, Genia</Text>
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
        </View>
      )}

      <Pressable
        style={globalStyles.buttons.primary}
        onPress={() => navigate("CreateContent")}
      >
        <Text style={globalStyles.buttons.primary.text}>
          Create New Learning Material
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  tabContainer: {
    flex: 1,
    // backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default Study;
