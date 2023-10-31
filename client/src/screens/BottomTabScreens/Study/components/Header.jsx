import { View, Text, Pressable } from "react-native";

// styles
import { styles } from "../styles/createContent";

// icons
import ArrowBack from "../../../../../assets/icons/arrow_back.svg";

// Progress Bar
import { Bar } from "react-native-progress";

// navigation
import { useNavigation } from "@react-navigation/native";

const Header = ({ step, back }) => {
  const navigation = useNavigation();

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
        <Bar
          width={null}
          height={15}
          progress={step === 1 ? 0.25 : 0.75}
          color={"#7000FF"}
          borderRadius={100}
          useNativeDriver={false}
          unfilledColor={"#ECECEC"}
          borderWidth={0}
          style={{ marginTop: 16, marginVertical: 42 }}
        />
      )}
    </>
  );
};

export default Header;
