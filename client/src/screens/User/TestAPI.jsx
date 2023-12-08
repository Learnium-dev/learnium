import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestAPI = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    // Get token
    AsyncStorage.getItem("jwt").then((token) => {
      if (token) {
        setToken(token);
      }
    });

    // Consume API with token
    axios
      .get(`${baseURL}quizzes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setQuizzes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>{token}</Text>
    </View>
  );
};

export default TestAPI;
