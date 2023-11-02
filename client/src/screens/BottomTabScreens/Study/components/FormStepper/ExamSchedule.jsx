import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Platform,
} from "react-native";

// React
import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDate, setDays } from "../../../../../../slices/examSlice";

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

const ExamSchedule = ({ name, prev, next }) => {
  const dispatch = useDispatch();
  // const { date, days, content } = useSelector((state) => state.exam);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dateNow, setDateNow] = useState(new Date());
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

  const formattedDate = (date) => {
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    return formatted;
  };

  useEffect(() => {
    dispatch(setDate(examDate));
  }, [examDate]);

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    setShowPicker(Platform.OS === "ios");
    setDateNow(currentDate);

    let tempDate = new Date(currentDate);
    setExamDate(formattedDate(tempDate));
  };

  const onFinish = () => {
    dispatch(setDays(selectedOptions));
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}
    >
      {/* Exam Date */}
      <Text style={styles.subtitle}>Enter Exam Date</Text>
      <Pressable onPress={() => showMode("date")}>
        <TextInput
          placeholder={`${formattedDate(dateNow)}`}
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
          value={dateNow}
          display="calendar"
          onChange={onChange}
          is24Hour={true}
        />
      )}

      {/* Options */}
      <Text style={styles.subtitle}>Days of the week you want to study</Text>

      {daysWeek.map((item, index) => (
        <OptionButton
          key={index}
          text={item}
          isSelected={selectedOptions.includes(item)}
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

        <Pressable onPress={onFinish} style={styles.btnContent}>
          <Text style={styles.btnTextOption}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExamSchedule;
