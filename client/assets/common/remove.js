import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Switch } from "react-native";
import baseURL from "../../../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
​
const Quizzes = ({ index, question }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [token, setToken] = useState(null);
​
  useEffect(() => {
    // Function to fetch quizzes with a valid token
    const fetchQuizzesWithToken = async (jwtToken) => {
      try {
        const response = await axios.get(`${baseURL}quizzes`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        setQuizzes(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
​
    // Get the token from AsyncStorage
    AsyncStorage.getItem("jwt")
      .then((jwt) => {
        if (jwt) {
          setToken(jwt);
          fetchQuizzesWithToken(jwt); // Fetch quizzes with the retrieved token
          // console.log(quizzes)
        } else {
          setError("JWT token not found in AsyncStorage.");
        }
      })
      .catch((err) => {
        setError("Error retrieving JWT token from AsyncStorage.");
      });
  }, []);
​
  const [isTrueFalseEnabled, setTrueFalseEnabled] = useState(false);
  const [isWrittenEnabled, setWrittenEnabled] = useState(false);
  const [isMultipleChoiceEnabled, setMultipleChoiceEnabled] = useState(false);
  const [isFocusModeEnabled, setFocusModeEnabled] = useState(false);
​
  const handleFocusModeSwitch = () => {
    setFocusModeEnabled(!isFocusModeEnabled);
  };
​
  const handleTrueFalseSwitch = () => {
    setTrueFalseEnabled(!isTrueFalseEnabled);
  };
​
  const handleWrittenSwitch = () => {
    setWrittenEnabled(!isWrittenEnabled);
  };
​
  const handleMultipleChoiceSwitch = () => {
    setMultipleChoiceEnabled(!isMultipleChoiceEnabled);
  };
​
  const handleButtonClick = () => {
    
  };
​
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>Focus mode:</Text>
        <Switch
          value={isFocusModeEnabled}
          onValueChange={handleFocusModeSwitch}
          trackColor={{ false: 'white', true: 'black' }}
        />
      </View>
      <View>
        <Text>Set up your quiz</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>True/False:</Text>
        <Switch
          value={isTrueFalseEnabled}
          onValueChange={handleTrueFalseSwitch}
          trackColor={{ false: 'white', true: 'black' }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>Multiple Choice:</Text>
        <Switch
          value={isMultipleChoiceEnabled}
          onValueChange={handleMultipleChoiceSwitch}
          trackColor={{ false: 'white', true: 'black' }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>Written:</Text>
        <Switch
          value={isWrittenEnabled}
          onValueChange={handleWrittenSwitch}
          trackColor={{ false: 'white', true: 'black' }}
        />
      </View>
      
      <Button title="Start the quiz" onPress={handleButtonClick} style={{ color: 'black' }} />
      <Text>Quizzes:</Text>
        {quizzes.map((quiz, idx) => (
          <Text key={idx}>{quiz.folderid}</Text>
        ))}
    </View>
  );
};
​
export default Quizzes;