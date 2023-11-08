import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";

export const globalStyles = StyleSheet.create({
  colors: {
    primary: "#7000FF",
    secondary: "#FF4C4C",
    white: "#fff",
    accent: "#FEE702",
    textColor: "#262626",
    background: "#FFF",
  },
  buttons: {
    primary: {
      backgroundColor: "#7000FF",
      color: "#fff",
      borderRadius: 30,
      padding: 20,
      marginBottom: 0,
      marginTop: 20,
      marginHorizontal: 20,

      text: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Gabarito-Bold",
      },
    },
  },
  fonts: {
    gabaritoRegular: "Gabarito-Regular",
    gabaritoBold: "Gabarito-Bold",
    nunitoRegular: "Nunito-Regular",
    nunitoSemiBold: "Nunito-SemiBold",
  },
});
