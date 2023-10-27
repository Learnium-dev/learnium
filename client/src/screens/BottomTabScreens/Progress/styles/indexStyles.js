import { StyleSheet } from "react-native";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 16,
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
  },
  progressBar: {
    position: "relative",
    backgroundColor: "#ECECEC",
    overflow: "hidden",
  },
  progressText: {
    position: "absolute",
    top: "50%",
    left: 20,
    marginTop: -13,
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
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  btnText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
    color: "#FFF",
  },
});
