import { LogBox, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { MenuProvider } from "react-native-popup-menu";

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

// toaster
import Toast, { BaseToast } from "react-native-toast-message";

// Context API
import Auth from "./src/context/store/Auth";
import Navigation from "./navigation";
import { useEffect, useState } from "react";

//react-native
import { View, TouchableOpacity, Text } from "react-native";
import { FontDisplay } from "expo-font";

// Ignore all warnings
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Gabarito-Regular": require("./assets/fonts/static/Gabarito-Regular.ttf"),
    "Gabarito-Bold": require("./assets/fonts/static/Gabarito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/static/Nunito-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const toastConfig = {
    contentToast: ({text1, text2, props}) => (
      <View style={{backgroundColor: "white", width: "95%", padding: 16, borderLeftColor: "#7000FF", borderLeftWidth: 10, borderRadius: 10 }}>
        <TouchableOpacity onPress={() => {
          props.navigateToMaterial()
          props.closeToast()
        }}>
          <Text style={{
            fontFamily: "Nunito-Bold",
            fontSize: 18,
            marginBottom: 10
          }}>{text1}</Text>
          <Text style={{
            fontFamily: "Nunito-Regular",
            fontSize: 16,
          }}>{text2}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // To fix error that fonts are loaded after the app is rendered
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Auth>
      <Provider store={store}>
        <MenuProvider
          customStyles={{
            backdrop: { backgroundColor: "black", opacity: 0.5 },
          }}
        >
          {/* <GestureHandlerRootView  style={{ flex: 1 }}> */}
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen options={{
                  gestureEnabled: false
                }} name="Navigation" component={Navigation} />
              </Stack.Navigator>
                     {/* Toaster */}
        <Toast config={toastConfig} />
            </NavigationContainer>
            {/* <Navigation /> */}
          {/* </GestureHandlerRootView> */}
        </MenuProvider>

 
      </Provider>
    </Auth>
  );
}
