import { View, Text, StyleSheet, Pressable } from "react-native";

// lottie view
import LottieView from "lottie-react-native";

// react
import { useRef, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import flashCardsSlice from "../../slices/flashCardsSlice";

const FlashCardInfoView = () => {
  const animation = useRef(null);
  const animation2 = useRef(null);
  const animation3 = useRef(null);
  const animation4 = useRef(null);

  const dispatch = useDispatch();
  const showingInfo = useSelector((state) => state.flashCards.showingInfo);
  const { setShowingInfo } = flashCardsSlice.actions;

  useEffect(() => {
    const timer = setTimeout(() => {
      animation.current?.play();
      animation2.current?.play();
      animation3.current?.play();
      animation4.current?.play();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Pressable
      onPress={() => dispatch(setShowingInfo(!showingInfo))}
      style={styles.mainContainer}
    >
      <View style={styles.overlay} />
      <Text style={styles.tapToMark}>Tap to mark as difficult</Text>
      <View style={styles.bookmarkInfoIconA}>
        <LottieView
          ref={animation}
          source={require("../../assets/icons/Study/Bookmark/data.json")}
          autoPlay
          loop={true}
          style={{ width: 30, height: 60 }}
        />
      </View>
      {/* <BookmarkInfo style={styles.bookmarkInfoIcon} /> */}
      <View style={styles.tapToSeeAnswer}>
        <Text style={styles.textItem}>Tap to see answer</Text>
        <LottieView
          ref={animation2}
          source={require("../../assets/icons/Study/Tap to see answer/data.json")}
          autoPlay
          loop={true}
          style={{ width: 30, height: 60 }}
        />
        {/* <TapToSeeAnswer /> */}
      </View>

      <View style={styles.navHelp}>
        <View style={styles.navHelpItem}>
          <View style={styles.prevImageA}>
            <LottieView
              ref={animation3}
              source={require("../../assets/icons/Study/Previous/data.json")}
              autoPlay
              loop={true}
              style={{ width: 30, height: 60 }}
            />
          </View>
          {/* <Previous style={styles.prevImage} /> */}
          {/* <Text style={styles.textItem}>Previous</Text> */}
        </View>
        <View>
          <View style={styles.navHelpItem}>
            <View style={styles.nextImageA}>
              <LottieView
                ref={animation4}
                source={require("../../assets/icons/Study/Next/data.json")}
                autoPlay
                loop={true}
                style={{ width: 30, height: 60 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

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
  bookmarkInfoIconA: {
    opacity: 1,
    position: "absolute",
    right: 17,
    top: -24, // -4
    zIndex: 3,
  },
  textItem: {
    color: "white",
    fontFamily: "Nunito-Regular",
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
  navHelpItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  prevImage: {
    marginLeft: 20,
    marginRight: 5,
  },
  prevImageA: {
    marginLeft: 10,
  },
  nextImage: {
    marginLeft: 5,
    marginRight: 20,
  },
  nextImageA: {
    marginRight: 10,
  },
});

export default FlashCardInfoView;
