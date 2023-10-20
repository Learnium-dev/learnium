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

// tab bottom navigator
function TabBottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="StudyMain"
        component={StudyStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TestAPI"
        component={TestAPI}
        options={{ headerShown: false }}
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
      <StudyStack.Screen name="Study" component={Study} options={{ headerShown: false }}/>
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

export default function Navigation() {
  return (
    <BottomSheetModalProvider>
      {/* <NavigationContainer> */}
        <TabBottomNavigator />
      {/* </NavigationContainer> */}
    </BottomSheetModalProvider>
  );
}
