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
    // paddingBottom: 30,
    // paddingHorizontal: 16,
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: "Gabarito-Bold",
    lineHeight: 30,
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Gabarito-Bold",
    lineHeight: 30,
    marginBottom: 10,
  },
  progressBarContainer: {
    display: "flex",
    position: "relative",
    marginVertical: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 35,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#7000FF",
    borderRadius: 100,
  },
  progressText: {
    position: "absolute",
    top: "50%",
    left: 20,
    marginTop: -10,
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
    color: "#FFF",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#CDCDCD",
    marginVertical: 30,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7000FF",
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: -16,
  },
  btnText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
    color: "#FFF",
  },
});
