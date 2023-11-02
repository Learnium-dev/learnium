import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 30,
    paddingHorizontal: 16,
    margin: 0,
  },
  title: {
    fontSize: 24,
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
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 53,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#262626",
    padding: 16,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    fontFamily: "Nunito-Regular",
    fontSize: 14,
  },
});
