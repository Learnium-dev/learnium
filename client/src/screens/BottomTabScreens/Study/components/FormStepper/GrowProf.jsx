import { View, Text, Pressable, FlatList } from "react-native";

// Components
import Header from "../Header";

// React
import { useState } from "react";

// helpers
import { daysWeek } from "../../../../../../utils/helpers";

// Styles
import { styles } from "../../styles/createContent2";

const OptionButton = ({ text, isSelected, onPress }) => {
  return (
    <Pressable
      style={[styles.btnOption, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, isSelected && styles.selectedOptionText]}>
        {text}
      </Text>
    </Pressable>
  );
};

const GrowProf = ({ name }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}
    >
      {/* Header */}
      <Header name={name} />

      {/* Options */}
      <Text style={styles.subtitle}>Days of the week you want to study</Text>

      <FlatList
        data={daysWeek}
        renderItem={({ item }) => (
          <OptionButton
            text={item}
            isSelected={selectedOptions.includes(item)}
            onPress={() => handleOptionPress(item)}
          />
        )}
        keyExtractor={(item) => item}
      />

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
          <Text style={styles.btnTextOption}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GrowProf;
