import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Platform,
} from "react-native";

// Components
import Header from "../Header";

// React
import { useState } from "react";

// helpers
import { daysWeek } from "../../../../../../utils/helpers";

// Styles
import { styles } from "../../styles/createContent2";

// Date Time Picker
import DateTimePicker from "@react-native-community/datetimepicker";

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

const ExamSchedule = ({ name }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [examDate, setExamDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formattedDate = tempDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setExamDate(formattedDate);
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}
    >
      {/* Header */}
      <Header name={name} />

      {/* Exam Date */}
      <Text style={styles.subtitle}>Enter Exam Date</Text>
      <Pressable onPress={() => showMode("date")}>
        <TextInput
          placeholder="October 09, 2023"
          placeholderTextColor={"gray"}
          value={examDate}
          editable={false}
          style={styles.datePicker}
        />
      </Pressable>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={mode}
          value={date}
          display="calendar"
          onChange={onChange}
          is24Hour={true}
        />
      )}

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

export default ExamSchedule;
