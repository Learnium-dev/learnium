// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// react native
import { View, Text } from "react-native";

// screens
// screens - study
import Study from "./src/screens/BottomTabScreens/Study/index";
import AllMaterials from "./src/screens/BottomTabScreens/Study/AllMaterials";
import CreateNewMaterial from "./src/screens/BottomTabScreens/Study/CreateNewMaterial";
import KeyTopic from "./src/screens/BottomTabScreens/Study/KeyTopic";
import NextDayPlan from "./src/screens/BottomTabScreens/Study/NextDayPlan";
import UploadScreen from "./src/screens/BottomTabScreens/Study/UploadScreen";
import CreateContent from "./src/screens/BottomTabScreens/Study/CreateContent";

// Icons
import StudyTabIcon from "./assets/icons/study-tab.svg";
import ProgressTabIcon from "./assets/icons/progress-tab.svg";
import DailyTabIcon from "./assets/icons/daily-tab.svg";
import ProfileTabIcon from "./assets/icons/profile-tab.svg";

// screens - progress
import Progress from "./src/screens/BottomTabScreens/Progress";

// screens - daily
import Daily from "./src/screens/BottomTabScreens/Daily";

// screens - account
import Account from "./src/screens/BottomTabScreens/Account";

// screen to test API with token
import TestAPI from "./src/screens/User/TestAPI";

import SingleKeyTopicProgress from "./src/screens/BottomTabScreens/Progress/SingleKeyTopicProgress";

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
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <StudyTabIcon />,
          tabBarShowLabel: false,
        }}
      />
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

// study stack navigator
const StudyStack = createNativeStackNavigator();
function StudyStackNavigator() {
  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="Study"
        component={Study}
        options={{ headerShown: false }}
      />
      <StudyStack.Screen name="CreateContent" component={CreateContent} />
      <StudyStack.Screen name="UploadScreen" component={UploadScreen} />
      <StudyStack.Screen name="AllMaterials" component={AllMaterials} />
      <StudyStack.Screen
        name="KeyTopic"
        component={KeyTopic}
        options={{ headerShown: false }}
      />
      <StudyStack.Screen name="NextDayPlan" component={NextDayPlan} />
      <StudyStack.Screen
        name="CreateNewMaterial"
        component={CreateNewMaterial}
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
      <ProgressStack.Screen name="MaterialProgress" component={AllMaterials} />
    </ProgressStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <BottomSheetModalProvider>
      {/* <NavigationContainer> */}
      <TabBottomNavigator />
      {/* </NavigationContainer> */}
    </BottomSheetModalProvider>
  );
}
