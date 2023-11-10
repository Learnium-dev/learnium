import { useCallback } from "react";
import { ScrollView, Dimensions, View, StyleSheet, Text } from "react-native";

let { width } = Dimensions.get("window");

// Fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const FormContainer = (props) => {
  const [fontsLoaded] = useFonts({
    "Gabarito-Regular": require("../../../assets/fonts/static/Gabarito-Regular.ttf"),
    "Gabarito-Medium": require("../../../assets/fonts/static/Gabarito-Medium.ttf"),
    "Gabarito-Bold": require("../../../assets/fonts/static/Gabarito-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Gabarito-Bold",
    color: "#262626",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: "#262626",
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 30,
  },
});

export default FormContainer;
