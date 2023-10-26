// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// screens
// screens - study
import Study from "./src/screens/BottomTabScreens/Study/index";
import AllMaterials from "./src/screens/BottomTabScreens/Study/AllMaterials";
import CreateNewMaterial from "./src/screens/BottomTabScreens/Study/CreateNewMaterial";
import KeyTopic from "./src/screens/BottomTabScreens/Study/KeyTopic";
import NextDayPlan from "./src/screens/BottomTabScreens/Study/NextDayPlan";
import UploadScreen from "./src/screens/BottomTabScreens/Study/UploadScreen";
import CreateContent from "./src/screens/BottomTabScreens/Study/CreateContent";

// screens - progress
import Progress from "./src/screens/BottomTabScreens/Progress";

// screens - daily
import Daily from "./src/screens/BottomTabScreens/Daily";

// screens - account
import Account from "./src/screens/BottomTabScreens/Account";

// screen to test API with token
import TestAPI from "./src/screens/User/TestAPI";

// Bottom Tab Navigator Icons
import StudyIcon from "./assets/navbar_icons/study_icon.svg";
import ProgressIcon from "./assets/navbar_icons/progress_icon.svg";
import DailyIcon from "./assets/navbar_icons/daily_icon.svg";
import ProfileIcon from "./assets/navbar_icons/profile_icon.svg";

import SingleKeyTopicProgress from "./src/screens/BottomTabScreens/Progress/SingleKeyTopicProgress";

// tab bottom navigator
function TabBottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Study"
        component={StudyStackNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <StudyIcon width={32} height={32} />,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressStackNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <ProgressIcon width={32} height={32} />,
        }}
      />
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <DailyIcon width={32} height={32} />,
        }}
      />
      <Tab.Screen
        name="TestAPI"
        component={TestAPI}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <ProfileIcon width={32} height={32} />,
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
      <StudyStack.Screen name="StudyPage" component={Study} />
      <StudyStack.Screen name="CreateContent" component={CreateContent} />
      <StudyStack.Screen name="UploadScreen" component={UploadScreen} />
      <StudyStack.Screen name="AllMaterials" component={AllMaterials} />
      <StudyStack.Screen name="KeyTopic" component={KeyTopic} />
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
