import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import NavHeader from "../../../components/NavHeader";
import { useState, useRef } from "react";
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
import { globalStyles } from "../../../../assets/common/global-styles";
import LumiWithTextLeft from "../../../../assets/images/characters/lumiWithTextBubbleLeft.svg";
import TextBubbleLeft from "../../../../assets/images/decorative/textBubbleLeft.svg";
import TextBubbleRight from "../../../../assets/images/decorative/textBubbleRight.svg";

const lumiHeadline = [
  "Hi there. Ask me anything!",
  "Let me think about it.",
  "Here you go.",
];

const AskAI = ({ route }) => {
  const [suggestionArray, setSuggestionArray] = useState([]);

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
  const scrollView = useRef();

  const handleContentSizeChange = () => {
    scrollView.current.scrollToEnd({ animated: true });
  };

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
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          <View style={styles.lumiWrap}>
            <View style={styles.characterTextWrap}>
              <Text style={styles.textCharacter}>{lumiState}</Text>
              <LumiWithTextLeft
                style={styles.character}
                height={150}
                width={300}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              // backgroundColor: "yellow",
              flex: 1,
            }}
          >
            <View
              style={{
                padding: 10,
                borderColor: globalStyles.colors.primary,
                borderWidth: 2,
                borderRadius: 16,
                marginTop: 16,
                gap: 10,
                
              }}
            >
              <Text
                style={{
                  color: globalStyles.colors.primary,
                  fontWeight: 700,
                  fontSize: 19,
                }}
              >
                Suggestions:
              </Text>

              {/* <View
                style={{ borderWidth: 2, borderColor: "grey", width: "50%" }}
              > */}
              {suggestionArray.map((suggestion, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ marginBottom: 10, justifyContent: "center" }}
                    onPress={() => handleSuggestionSelected(suggestion)}
                  >
                    <TextBubbleRight
                      style={{ color: "black", zIndex: 0 }}
                    ></TextBubbleRight>
                    <Text
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        left: 10,
                        width: "50%",
                      }}
                    >
                      
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* </View> */}
            </View>
            <View
              style={{ flex: 1, 
                // backgroundColor: "orange" 
              }}
              // style={{ backgroundColor: "starwberry", height:"100%", overflow:"scroll"}}
            >
              {/* chat area */}
              <ScrollView
                ref={scrollView}
                onContentSizeChange={handleContentSizeChange}
                style={{
                  
                  // backgroundColor: "starwberry",
                  // height: "100%",
                  // overflow: "hidden",
                  flex: 1,
                  flexDirection: "column",
                 
                }}
                contentContainerStyle={{
                  // backgroundColor: "tomato",
                  // height: "100%",
                  // overflow: "hidden",
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  // alignItems: "flex-end",
                  // flexDirection: "column",
                }}
              >
                {chatHistory.map((chat, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "end",
                        justifyContent: chat.isUser ? "flex-end" : "flex-start",
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          
                          alignItems: chat.isUser ?   "flex-end": "flex-start" ,
                          // backgroundColor: chat.isUser
                          //   ? "tomato"
                          //   : "gold",
                          borderWidth: 2,
                          borderRadius: 16,
                          borderColor: chat.isUser ? "black":globalStyles.colors.primary,
                          width: "60%",
                          marginBottom: 5,
                          marginTop: 5,
                        }}
                      >
                       
                        {chat.isUser ? (
                          <Text
                            style={{
                             
                              zIndex: 1,
                              textAlign: "right",
                              width: "100%",
                              // right: 10,
                              // top: 10,
                              padding: 5,
                            }}
                          >
                            {chat.text}
                          </Text>
                        ) : (
                          <Text
                            style={{
                            
                              zIndex: 1,
                              textAlign: "left",
                              width: "100%",
                              padding: 5,
                            
                            }}
                          >
                            {chat.text}
                          </Text>
                        )}
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
            // backgroundColor: "orange",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:"transparent",  
            borderRadius: 16, borderWidth: 2, borderColor: globalStyles.colors.primary, padding: 10 
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={{  flex: 1, height: 50,}}
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
    backgroundColor: globalStyles.colors.background,
    
  },
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: globalStyles.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lumiWrap: {
    borderBottomColor: globalStyles.colors.primary,
    borderBottomWidth: 2,
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  characterTextWrap: {
    width: "100%",
    position: "relative",
    // backgroundColor: "yellow",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textCharacter: {
    position: "absolute",
    top: 25,
    left: 50,
    width: "35%",
    zIndex: 1,
    color: globalStyles.colors.textColor,
    fontWeight: "bold",
    // backgroundColor: "pink",
  },
  character: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    zIndex: 0,

    // backgroundColor: "red",
  },
});
