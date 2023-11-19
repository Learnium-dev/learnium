import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";

// React
import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setDays,
  setUploaded,
} from "../../../../../../slices/examSlice";

// helpers
import { daysWeek } from "../../../../../../utils/helpers";
import baseURL from "../../../../../../assets/common/baseUrl";

// axios
import axios from "axios";

// Styles
import { styles } from "../../styles/createContent2";

// Date Time Picker
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";

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
  const { folderId, date } = useSelector((state) => state.exam);
  const { token } = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dateNow, setDateNow] = useState(new Date());
  const [examDate, setExamDate] = useState("Select a Date");
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
      month: "long",
      day: "2-digit",
    });
    return formatted;
  };

  // useEffect(() => {
  //   dispatch(setDate(examDate));
  // }, [examDate]);

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    setShowPicker(!showPicker);
    setDateNow(currentDate);

    let tempDate = new Date(currentDate);
    setExamDate(formattedDate(tempDate));
    dispatch(setDate(formattedDate(tempDate)));
  };

  const onFinish = async () => {
    dispatch(setDays(selectedOptions));

    console.log("✅✅✅✅✅✅", date);

    // make a PUT request to update the keytopics
    const options = {
      method: "PUT",
      url: `${baseURL}keytopics/newContent/updateDate`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        days: selectedOptions,
        date: examDate,
        folderId,
      },
    };

    try {
      const response = await axios(options);
      dispatch(setUploaded(true));
      navigation.navigate("Study", { reload: Math.random() });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          overflow: "scroll",
        }}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "space-between",
          // backgroundColor: "yellow",
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
                value={dateNow}
                editable={false}
                style={styles.datePicker}
              />
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={mode}
                  value={dateNow}
                  display="default"
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
                <Text style={styles.datePicker}>{examDate}</Text>
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
              flex: 1,
              overflow: "scroll",
              marginBottom: 100,
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
      <View
        style={{
          ...styles.btnContainerSelector,
          paddingTop: 16,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.btnContent,
            backgroundColor: "#f5f5f5",
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
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onFinish}
          style={{
            ...styles.btnContent,
            flex: 1,
            borderWidth: 2,
            borderColor: "#7000FF",
            paddingVertical: 15,
          }}
        >
          <Text style={styles.btnTextOption}>Finish</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExamSchedule;
