import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: "Gabarito-Bold",
    fontSize: 18,
    color: "#7000FF",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: "Gabarito-Regular",
    fontSize: 16,
    color: "#262626",
  },
  cardDueDate: {
    fontFamily: "Gabarito-Regular",
    fontSize: 16,
    color: "#262626",
    marginBottom: 4,
  },
  cardCharacter: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  cardCharacterInactive: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
