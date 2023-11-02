import { LogBox } from "react-native";
import * as Font from 'expo-font';

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

const loadFonts = async () => {
  await Font.loadAsync({
    'Gabarito-Regular': require('./assets/fonts/static/Gabarito-Regular.ttf'),
    'Gabarito-Bold': require('./assets/fonts/static/Gabarito-Bold.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf'),
  });
}

export default function App() {
  loadFonts();

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
