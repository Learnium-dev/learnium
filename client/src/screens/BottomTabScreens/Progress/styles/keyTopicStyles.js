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
  cardCharacterInactive: {
    position: "absolute",
    right: 0,
    bottom: -20,
  },
});
