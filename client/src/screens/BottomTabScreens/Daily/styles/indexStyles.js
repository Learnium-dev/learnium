import { StyleSheet } from "react-native";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    margin: 0,
  },
  title: {
    fontSize: 26,
    fontFamily: "Gabarito-Bold",
    lineHeight: 30,
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 25,
    gap: 25,
  },
  streakBox: {
    dfisplay: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleStreak: {
    fontFamily: "Gabarito-Bold",
    fontSize: 96,
    color: "#262626",
    textAlign: "center",
  },
  subtitleStreak: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#262626",
    textAlign: "center",
  },
  dailyBox: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#7000FF",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  dailyTitle: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "#7000FF",
    textAlign: "left",
    marginBottom: 4,
  },
  dailyText: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
    color: "#262626",
  },
  userOption: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#262626",
  },
  dailyQuestionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 2,
    borderColor: "#7000FF",
    borderRadius: 16,
    backgroundColor: "#7000FF",
    minHeight: 218,
  },
  dailyHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  question: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "#fff",
  },
  answer: {
    borderRadius: 8,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  studyButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#7000FF",
    padding: 16,
  },
  studyButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "#fff",
  },
});
