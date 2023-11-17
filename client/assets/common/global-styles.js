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
    primary: "#7000FF", // purple
    secondary: "#FF4C4C", // orange
    white: "#fff", // white
    accent: "#FEE702", // yellow
    textColor: "#262626", // dark grey
    background: "#FFF", // white
    buttonPressed: '#3A179D' // dark purple
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
