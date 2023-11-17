import { View, Text, StyleSheet } from "react-native";
import BookmarkInfo from "../../assets/icons/bookmark-info.svg";
import TapToSeeAnswer from "../../assets/icons/tap-to-view.svg";
import Previous from "../../assets/icons/previous.svg";
import Next from "../../assets/icons/next.svg";

const FlashCardInfoView = () => {

  return (
    <View style={styles.mainContainer}>
      <View style={styles.overlay} />
      <Text style={styles.tapToMark}>
        Tap to mark as difficult
      </Text>
      <BookmarkInfo style={styles.bookmarkInfoIcon} />
      <View
        style={styles.tapToSeeAnswer}
      >
        <Text style={styles.textItem}>
          Tap to see answer
        </Text>
        <TapToSeeAnswer />
      </View>

      <View style={styles.navHelp}>
        <View style={styles.navHelpItem} >
          <Previous style={styles.prevImage} />
          <Text
            style={styles.textItem}
          >
            Previous
          </Text>
        </View>
        <View>
          <View style={styles.navHelpItem}>
            <Text style={styles.textItem}>
              Next
            </Text>
            <Next style={styles.nextImage} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.7,
    borderRadius: 20,
  },
  bookmarkInfoIcon: {
    opacity: 1,
    position: "absolute",
    right: 32,
    top: -20, // -4
    zIndex: 3,
  },
  textItem: { 
    color: "white", 
    fontFamily: "Nunito-Regular" 
  },
  tapToMark: {
    color: "white",
    position: "absolute",
    right: 26,
    top: -43,
    fontFamily: "Nunito-Regular",
  },
  tapToSeeAnswer: {
    position: "absolute",
    top: "45%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navHelp: {
    position: "absolute",
    bottom: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navHelpItem:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  prevImage: { 
    marginLeft: 20, 
    marginRight: 5 
  },
  nextImage: { 
    marginLeft: 5, 
    marginRight: 20 
  }
});

export default FlashCardInfoView;