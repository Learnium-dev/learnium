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
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

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
  const navigation = useNavigation();
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

  console.log("showPicker: ", showPicker);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    // setShowPicker(Platform.OS === "ios");
    setShowPicker(!showPicker);
    setDateNow(currentDate);

    let tempDate = new Date(currentDate);
    setExamDate(formattedDate(tempDate));
  };

  const onFinish = () => {
    dispatch(setDays(selectedOptions));
    navigation.navigate("Study");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        // backgroundColor: "yellow",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          // height:"50%",
          // height:"100%",
          // maxHeight: "100%",
          // backgroundColor: "red",
          overflow: "scroll",
        }}
      >
        <View>
          {/* Exam Date */}
          <Text style={styles.subtitle}>Enter Exam Date</Text>
          {Platform.OS === "android" && (
            <Pressable onPress={() => showMode("date")}>
              {/* <Text style={styles.datePicker} >{examDate}</Text> */}
              <TextInput
                placeholder={`${formattedDate(dateNow)}`}
                placeholderTextColor={"gray"}
                value={examDate}
                editable={false}
                style={styles.datePicker}
              />
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={mode}
                  value={dateNow}
                  display="calendar"
                  onChange={onChange}
                  is24Hour={true}
                  // style={{ backgroundColor: "gold" }}
                />
              )}
            </Pressable>
          )}

          {
            Platform.OS === "ios" && (
              
              <Pressable onPress={() => showMode("date")}>
              <Text style={styles.datePicker} >{examDate}</Text>
              {/* <TextInput
                placeholder={`${formattedDate(dateNow)}`}
                placeholderTextColor={"gray"}
                value={examDate}
                editable={false}
                style={styles.datePicker}
              /> */}
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={mode}
                  value={dateNow}
                  display="inline"
                  onChange={onChange}
                  is24Hour={true}
                  
                />
              )}
            </Pressable>
              
            )
            // Code specific to iOS
          }

          {/* Options */}
          <View
            style={{
              // backgroundColor: "pink",
              // height: "50%",
              flex: 1,
              overflow: "scroll",
            }}
          >
            <Text style={styles.subtitle}>
              Days of the week you want to study
            </Text>

            {daysWeek.map((item, index) => (
              <OptionButton
                key={index}
                text={item}
                isSelected={selectedOptions.includes(item)}
                onPress={() => handleOptionPress(item)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
