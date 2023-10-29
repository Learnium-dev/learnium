import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontFamily: "Gabarito-Bold",
    marginTop: 25,
    marginBottom: 15,
  },
  btnOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#262626",
    paddingVertical: 16,
  },
  btnText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "#262626",
  },
  selectedOption: {
    backgroundColor: "#7000FF",
    borderColor: "#7000FF",
  },
  selectedOptionText: {
    color: "#fff",
  },
  btnContainerSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    gap: 10,
  },
  btnContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 100,
    backgroundColor: "#7000FF",
    borderColor: "#7000FF",
    borderWidth: 2,
    paddingVertical: 15,
    marginTop: 20,
  },
  btnTextOption: {
    fontFamily: "Gabarito-Bold",
    color: "white",
    fontSize: 22,
  },
  datePicker: {
    fontFamily: "Nunito-Regular",
    color: "#262626",
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#7000FF",
    margin: 0,
    marginBottom: 40,
  },
});