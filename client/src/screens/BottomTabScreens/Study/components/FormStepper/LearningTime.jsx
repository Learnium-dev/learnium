import { View, Text, Pressable, FlatList } from "react-native";

// Components
import Header from "../Header";

// React
import { useState } from "react";

// helpers
import { minutesDay } from "../../../../../../utils/helpers";

// Styles
import { styles } from "../../styles/createContent2";

const OptionButton = ({ text, isSelected, onPress }) => {
  return (
    <Pressable
      style={[
        { ...styles.btnOption, justifyContent: "flex-start", paddingLeft: 20 },
        isSelected && styles.selectedOption,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, isSelected && styles.selectedOptionText]}>
        {text}
      </Text>
    </Pressable>
  );
};

const LearningTime = ({ name, prev, next }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionPress = (option) => {
    const label = option?.label;
    setSelectedOption(selectedOption === label ? "" : label);
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}
    >
      {/* Header */}
      <Header name={name} back={prev} />

      {/* Options */}
      <Text style={styles.subtitle}>
        How many minutes do you want to study daily?
      </Text>

      {minutesDay.map((item, index) => (
        <OptionButton
          key={index}
          text={item?.label}
          isSelected={selectedOption === item.label}
          onPress={() => handleOptionPress(item)}
        />
      ))}

      {/* Buttons */}
      <View style={styles.btnContainerSelector}>
        <Pressable
          style={{
            ...styles.btnContent,
            backgroundColor: "white",
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
        <Pressable style={styles.btnContent}>
          <Text style={styles.btnTextOption}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LearningTime;
