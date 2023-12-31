import { StyleSheet } from "react-native";

// Responsivesness
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: "Gabarito-Bold",
    margin: 0,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Gabarito-Regular",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  bannerText: {
    fontFamily: "Gabarito-Regular",
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
    width: "100%",
  },
  checkMarksContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#7000FF",
    marginVertical: 20,
  },
  subContainerInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  subContainerInfoTitle: {
    fontFamily: "Gabarito-Regular",
    fontSize: 14,
    lineHeight: 25,
    textAlign: "center",
  },
  subContainerInfoText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 16,
    textAlign: "center",
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
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#7000FF",
  },
  btnText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 19,
    color: "#FFF",
  },
});
