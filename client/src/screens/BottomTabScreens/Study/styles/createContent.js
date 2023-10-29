import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontFamily: "Gabarito-Bold",
    margin: 0,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Gabarito-Bold",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 10,
    gap: 32,
  },
  uploadBtn: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#262626",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  btnText: {
    fontFamily: "Nunito-Regular",
  },
  dividerText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 32,
    textAlign: "center",
    marginVertical: 10,
  },
  textarea: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    height: 350,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#262626",
    padding: 16,
    resizeMode: "none",
  },
  btnContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#7000FF",
    paddingVertical: 20,
    marginTop: 20,
  },

  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 20,
    gap: 20,
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#262626",
  },
  optionText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 19,
  },
  btnTextOption: {
    fontFamily: "Gabarito-Bold",
    color: "white",
    fontSize: 22,
  },
  selectedOption: {
    backgroundColor: "#7000FF",
    borderWidth: 0,
  },
  selectedOptionText: {
    color: "white",
  },
  btnContainerSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    gap: 10,
  },
});
