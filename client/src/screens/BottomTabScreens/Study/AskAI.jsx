import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import NavHeader from "../../../components/NavHeader";
import { useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ChatSendBtn from "../../../../assets/icons/chatSendBtn.svg";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useMemo } from "react";
import axios from "axios";
import { askai } from "../../../services/askAI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lumiHeadline = [
  "Hi there. Ask me anything!",
  "Let me think about it.",
  "Here you go.",
];

const AskAI = ({ route }) => {
  const [suggestionArray, setSuggestionArray] = useState([]);
  //   !which one is better? useEffect or useMemo for store parameter from route?
  //   useEffect(() => {
  //     // set suggestion array based on route.params
  //     let getRouteParams = () => {
  //       if (route.params.askTopic) {
  //         setSuggestionArray((prevArray) => [
  //           ...prevArray,
  //           `Explain more about ${route.params.askTopic}`,
  //         ]);
  //       }
  //       if (route.params.questionAsk) {
  //         setSuggestionArray((prevArray) => [
  //           ...prevArray,
  //           `Explain more about this question ${route.params.questionAsk}`,
  //         ]);
  //       }
  //       if (route.params.wrongAnswer) {
  //         setSuggestionArray((prevArray) => [
  //           ...prevArray,
  //           `Why my answer ${route.params.wrongAnswer} is wrong?`,
  //         ]);
  //       }
  //     };
  //     getRouteParams();
  //   }, []);
  // change from useEffect to useMemo
  const suggestionArrayMemo = useMemo(() => {
    let suggestionArray = [];
    if (route.params.askTopic) {
      suggestionArray.push(`Explain more about ${route.params.askTopic}`);
    }
    if (route.params.questionAsk) {
      suggestionArray.push(
        `Explain more about this question ${route.params.questionAsk}`
      );
    }
    if (route.params.wrongAnswer) {
      suggestionArray.push(
        `Why my answer ${route.params.wrongAnswer} is wrong?`
      );
    }
    setSuggestionArray(suggestionArray);
    return suggestionArray;
  }, [
    route.params.askTopic,
    route.params.questionAsk,
    route.params.wrongAnswer,
  ]);

  //   console.log("🚀 ~ file: AskAI.jsx:41 ~ suggestionArray:", suggestionArray);
  const [lumiState, setLumiState] = useState(lumiHeadline[0]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSuggestionSelected = (e) => {
    console.log("handleSuggestionSelected", e);

    setInputText(e);
  };

  const onChangeText = (text) => {
    console.log("onChangeText", text);
    setInputText(text);
  };

  const handleChat = async () => {
    let token = await AsyncStorage.getItem("jwt");
    setChatHistory((prevArray) => [
      ...prevArray,
      { text: inputText, isUser: true },
    ]);
    setInputText("");
    console.log(`${process.env.EXPO_PUBLIC_HOSTNAME}/askai`);
    const submitChat = async () => {
        setLumiState(lumiHeadline[1]);
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_HOSTNAME}/askai`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({ inputText }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data);
        // console.log(typeof data);
        setChatHistory((prevArray) => [
          ...prevArray,
          { text: data, isUser: false },
        ]);
        setLumiState(lumiHeadline[2]);
      } catch (error) {
        console.log(error?.message);
      }
    };
    submitChat();
  };
  console.log("chatHistory", chatHistory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader blackText={"Ask "} purpleText={"Dr.Lumi"} isCenter={"true"} />
      <View style={styles.container}>
        {/* top section wrap */}
        <View style={{ flex: 1, height: "100%", backgroundColor: "salmon" }}>
          <View style={{ borderWidth: 2, borderColor: "grey" }}>
            <Text>{lumiState}</Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "grey",
              backgroundColor: "yellow",
            }}
          >
            <Text>Suggestion</Text>
            <View style={{ borderWidth: 2, borderColor: "grey", width: "50%" }}>
              {suggestionArray.map((suggestion, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ backgroundColor: "hotpink", marginBottom: 10 }}
                    onPress={() => handleSuggestionSelected(suggestion)}
                  >
                    <Text>{suggestion}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View 
            // style={{ backgroundColor: "starwberry", height:"100%", overflow:"scroll"}}
            >
              {/* chat area */}
              <ScrollView style={{ backgroundColor: "starwberry", height:"100%", overflow:"hidden"}}>
                {chatHistory.map((chat, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: chat.isUser ? "flex-end" : "flex-start",overflow:"hidden"
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: chat.isUser
                            ? "tomato"
                            : "MediumSeaGreen",
                          width: "50%",
                        }}
                      >
                        <Text>{chat.text}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        {/* input */}
        <View
          style={{
            backgroundColor: "orange",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={{ backgroundColor: "pink", flex: 1, height: 50 }}
            value={inputText}
            onChangeText={(text) => onChangeText(text)}
          ></TextInput>
          <TouchableOpacity onPress={handleChat}>
            <ChatSendBtn />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AskAI;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  container: {
    flex: 1,

    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
