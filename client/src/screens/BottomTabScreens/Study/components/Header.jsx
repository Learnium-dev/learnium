import { View, Text, Pressable, Animated, Dimensions } from "react-native";

// styles
import { styles } from "../styles/createContent";

// React
import { useRef, useEffect } from "react";

// icons
import ArrowBack from "../../../../../assets/icons/arrow_back.svg";

// Progress Bar
import { Bar } from "react-native-progress";

// navigation
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Header = ({ step, back }) => {
  const navigation = useNavigation();
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetValue = step === 1 ? width * 0.25 : width * 0.75;

    Animated.spring(barWidth, {
      toValue: targetValue,
      bounciness: 10,
      useNativeDriver: false,
      speed: 2,
    }).start();
  }, [step]);

  const getName = () => {
    switch (step) {
      case 0:
        return "Upload Content";
      case 1:
        return "Why are you creating this course?";
      case 2:
        return "Grow Professionally";
      case 3:
        return "Learn For Fun";
      case 4:
        return "Exam Schedule";
      default:
        return "Upload Content";
    }
  };

  const handlePress = () => {
    if (typeof back === "function") {
      back();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={handlePress}>
          <ArrowBack width={24} height={24} />
        </Pressable>
        <Text style={styles.title}>{getName()}</Text>
      </View>

      {/* Progress Bar */}
      {step !== 0 && (
        <View style={styles.progressBarContainer}>
          <Animated.View style={{ ...styles.progressBar, width: barWidth }} />
        </View>
        // <Bar
        //   width={null}
        //   height={15}
        //   progress={step === 1 ? 0.25 : 0.75}
        //   color={"#7000FF"}
        //   borderRadius={100}
        //   useNativeDriver={false}
        //   unfilledColor={"#ECECEC"}
        //   borderWidth={0}
        //   style={{ marginTop: 16, marginVertical: 42 }}
        // />
      )}
    </>
  );
};

export default Header;
