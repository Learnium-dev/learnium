import { View, Text, Pressable } from "react-native";
import Header from "../Header";

// React
import { useEffect, useState } from "react";

// icons
import Exam from "../../../../../../assets/icons/exam.svg";
import ExamSelected from "../../../../../../assets/icons/examSelectedPro.svg";
import Pro from "../../../../../../assets/icons/professional.svg";
import ProSelected from "../../../../../../assets/icons/professionalSelected.svg";
import Fun from "../../../../../../assets/icons/fun.svg";
import FunSelected from "../../../../../../assets/icons/funSelected.svg";

// Styles
import { styles } from "../../styles/createContent";

const OptionButton = ({ icon, text, isSelected, onPress }) => {
  return (
    <Pressable
      style={[styles.optionContainer, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[styles.optionText, isSelected && styles.selectedOptionText]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const PurposeContent = ({ name, prev, next, setPurpose }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setPurpose("");
  }, []);

  const renderIcon = (text) => {
    switch (text) {
      case "Exam":
        return <Exam width={40} height={40} />;
      case "Exam Selected":
        return <ExamSelected width={40} height={40} />;
      case "Pro":
        return <Pro width={40} height={40} />;
      case "Pro Selected":
        return <ProSelected width={40} height={40} />;
      case "Fun":
        return <Fun width={40} height={40} />;
      case "Fun Selected":
        return <FunSelected width={40} height={40} />;
      default:
        return null;
    }
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setPurpose(option);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Options */}
      <View style={styles.optionsContainer}>
        <OptionButton
          icon={
            selectedOption === "exam"
              ? renderIcon("Exam Selected")
              : renderIcon("Exam")
          }
          text="I have an exam"
          onPress={() => handleOptionPress("exam")}
          isSelected={selectedOption === "exam"}
        />
        <OptionButton
          icon={
            selectedOption === "pro"
              ? renderIcon("Pro Selected")
              : renderIcon("Pro")
          }
          text="Professional 
        Growth"
          onPress={() => handleOptionPress("pro")}
          isSelected={selectedOption === "pro"}
        />
        <OptionButton
          icon={
            selectedOption === "fun"
              ? renderIcon("Fun Selected")
              : renderIcon("Fun")
          }
          text="Learning For Fun"
          onPress={() => handleOptionPress("fun")}
          isSelected={selectedOption === "fun"}
        />
      </View>

      {/* Buttons */}
      <View
        style={{
          ...styles.btnContainerSelector,
          paddingVertical: 12,
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          style={{
            ...styles.btnContent,
            flex: 1,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#7000FF",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              ...styles.btnTextOption,
              color: "#7000FF",
            }}
          >
            Skip
          </Text>
        </Pressable>
        <Pressable
          style={{
            ...styles.btnContent,
            flex: 1,
            borderWidth: 2,
            borderColor: "#7000FF",
            paddingVertical: 15,
          }}
          onPress={next}
        >
          <Text style={styles.btnTextOption}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PurposeContent;
