import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: "Gabarito",
    fontWeight: "700",
    lineHeight: 30,
  },

  subtitle: {
    fontSize: 18,
    fontFamily: "Gabarito",
    fontWeight: "700",
    lineHeight: 30,
  },

  progressText: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateY: 4 }, { translateX: 20 }],
    fontFamily: "Gabarito",
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  card: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 4,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "#7000FF",
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: "Gabarito",
    fontSize: 20,
    fontWeight: "700",
    color: "#7000FF",
  },
  cardSubtitle: {
    fontFamily: "Gabarito",
    fontSize: 16,
    fontWeight: "700",
    color: "#262626",
  },
  cardDueDate: {
    fontFamily: "Gabarito",
    fontSize: 16,
    fontWeight: "400",
    color: "#262626",
  },
  cardCharacter: {
    position: "absolute",
    right: 0,
    bottom: -10,
  },
});
