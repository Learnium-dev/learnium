import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { globalStyles } from "../../../../assets/common/global-styles"
import NavHeader from "../../../components/NavHeader";

export const KeyTopicSummary = (props) => {

  const { keyTopic, openBottomSheet } = props.route.params;

  return (
    <View style={{ ...styles.container, paddingTop: 60 }}>
      <NavHeader
        title={keyTopic?.name}
        showMenu={false}
        style={{ marginTop: 20 }}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.summaryTitle}>Summary</Text>

        <View style={{ marginBottom: 20 }} key={keyTopic._id}>
          <Text style={styles.summaryText}>{keyTopic.summary}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.flashCardsButton} onPress={openBottomSheet}>
          <Text style={styles.flashCardsButtonText}>Study Flashcards</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginBottom: 120,
  },
  summary: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 10,
    color: globalStyles.colors.primary,
  },
  summaryText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  flashCardsButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  flashCardsButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: globalStyles.colors.primary,
  },
});

export default KeyTopicSummary;
