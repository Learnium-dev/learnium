import { LogBox } from "react-native";

// gesture handlers
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// navigation root component
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Import Stack Navigator

import Login from "./src/screens/User/Login";
import Register from "./src/screens/User/Register";

// redux imports
import { Provider } from "react-redux";
import { store } from "./store";

// Context API
import Auth from "./src/context/store/Auth";
import Navigation from "./navigation";

// Ignore all warnings
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Navigation" component={Navigation} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* <Navigation /> */}
        </GestureHandlerRootView>
      </Provider>
    </Auth>
  );
}
