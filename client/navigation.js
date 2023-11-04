// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// react native
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// redux
import { useSelector } from "react-redux";

// screens
// screens - study
import Study from "./src/screens/BottomTabScreens/Study/index";
import MaterialsStudy from "./src/screens/BottomTabScreens/Progress/AllMaterials";
import CreateNewMaterial from "./src/screens/BottomTabScreens/Study/CreateNewMaterial";
import KeyTopic from "./src/screens/BottomTabScreens/Study/KeyTopic";
import Material from "./src/screens/BottomTabScreens/Study/Material";
import NextDayPlan from "./src/screens/BottomTabScreens/Study/NextDayPlan";
import UploadScreen from "./src/screens/BottomTabScreens/Study/UploadScreen";
import CreateContent from "./src/screens/BottomTabScreens/Study/CreateContent";
import TakePhoto from "./src/screens/BottomTabScreens/Study/TakePhoto";
import QuizResult from "./src/screens/BottomTabScreens/Study/QuizResult";

import AskAI from "./src/screens/BottomTabScreens/Study/AskAI";
import remove from "./src/screens/BottomTabScreens/Study/OldCreateContent/remove";

// Icons
import StudyTabIcon from "./assets/icons/study-tab.svg";
import ProgressTabIcon from "./assets/icons/progress-tab.svg";
import DailyTabIcon from "./assets/icons/daily-tab.svg";
import ProfileTabIcon from "./assets/icons/profile-tab.svg";

// screens - progress
import Progress from "./src/screens/BottomTabScreens/Progress";
import AllMaterials from "./src/screens/BottomTabScreens/Progress/AllMaterials";

// screens - daily
import Daily from "./src/screens/BottomTabScreens/Daily";

// screens - account
import Account from "./src/screens/BottomTabScreens/Account";

// screen to test API with token
import TestAPI from "./src/screens/User/TestAPI";

// toaster
import Toast from "react-native-toast-message";

import SingleKeyTopicProgress from "./src/screens/BottomTabScreens/Progress/SingleKeyTopicProgress";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();
// tab bottom navigator
function TabBottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 64,
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name="StudyHome"
        component={StudyStackNavigator}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          headerShown: false,
          tabBarIcon: ({ focused }) => <StudyTabIcon />,
          tabBarShowLabel: false,
        })}
      />
      {/* <Tab.Screen
        name="KeyTopic"
        component={KeyTopic}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="QuizResult"
        component={QuizResult}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      /> */}
      <Tab.Screen
        name="Progress"
        component={ProgressStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ProgressTabIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <DailyTabIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="TestAPI"
        component={TestAPI}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ProfileTabIcon />,
          tabBarShowLabel: false,
        }}
      />
      {/* <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      /> */}
    </Tab.Navigator>
  );
}

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName === "CreateContent") {
    return "none";
  } else {
    return "";
  }
};

// study stack navigator
const StudyStack = createNativeStackNavigator();
function StudyStackNavigator() {
  const { uploaded } = useSelector((state) => state.exam);

  useEffect(() => {
    const showToast = () => {
      Toast.show({
        type: "success",
        text1: "Content Uploaded Successfully!",
        text2: "🎉🎉🎉🎉🎉🎉",
      });
    };

    if (uploaded) {
      showToast();
    }
  }, [uploaded]);

  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="Study"
        component={Study}
        options={{ headerShown: false }}
      />
      <StudyStack.Screen
        options={{ headerShown: false }}
        name="CreateContent"
        component={CreateContent}
      />
      <StudyStack.Screen name="TakePhoto" component={TakePhoto} />
      <StudyStack.Screen name="remove" component={remove} />
      {/* //       <StudyStack.Screen name="UploadScreen" component={UploadScreen} /> */}
      <StudyStack.Screen name="AllMaterials" component={AllMaterials} />
      <StudyStack.Screen name="UploadScreen" component={UploadScreen} 
      // options={{ headerShown: false }}
      />
      <StudyStack.Screen name="MaterialsStudy" component={MaterialsStudy} />
      {/* //       <StudyStack.Screen
//         name="KeyTopic"
//         component={KeyTopic}
//         options={{ headerShown: false }}
//       />
//       <StudyStack.Screen
//         name="QuizResult"
//         component={QuizResult}
//         // options={{ headerShown: false }}
//       />
// >>>>>>> dev */}
      <StudyStack.Screen name="NextDayPlan" component={NextDayPlan} />
      <StudyStack.Screen
        name="CreateNewMaterial"
        component={CreateNewMaterial}
        // options={{ headerShown: false }}
      />
      <StudyStack.Screen
        options={{ headerShown: false }}
        name="ProgressPage"
        component={Progress}
      />
    </StudyStack.Navigator>
  );
}

// progress stack navigator
const ProgressStack = createNativeStackNavigator();
function ProgressStackNavigator() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen
        options={{ headerShown: false }}
        name="ProgressPage"
        component={Progress}
      />
      <ProgressStack.Screen
        name="SingleKeyTopic"
        component={SingleKeyTopicProgress}
        options={{ headerShown: false }}
      />
      <ProgressStack.Screen
        options={{ headerShown: false }}
        name="AllMaterials"
        component={AllMaterials}
      />
    </ProgressStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <BottomSheetModalProvider>
      {/* <NavigationContainer> */}
      <Stack.Navigator>
        <Stack.Screen
          name="TabBottomNavigator"
          component={TabBottomNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <StudyTabIcon />,
            tabBarShowLabel: false,
          }}
        />
        <Stack.Screen
          name="StudyStackNavigator"
          component={StudyStackNavigator}
        />
        <StudyStack.Screen
          name="KeyTopic"
          component={KeyTopic}
          options={{ headerShown: false }}
        />
        <StudyStack.Screen
          name="Material"
          component={Material}
          options={{ headerShown: false }}
        />
        <StudyStack.Screen
          name="QuizResult"
          component={QuizResult}
          options={{ headerShown: false }}
        />
        <StudyStack.Screen
          name="AskAI"
          component={AskAI}
          options={{ headerShown: false }}
          // options={{
          //   headerShown: true,
          //   headerTitleStyle: { color: "black" }
          //   ,headerTitle: "Ask Dr. Lumi"
          // }}
        />
        {/* <TabBottomNavigator />
        <StudyStackNavigator /> */}
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </BottomSheetModalProvider>
  );
}
