import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect } from "react";
import NavHeader from "../../../components/NavHeader";
import { useState, useRef } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";

import ChatSendBtn from "../../../../assets/icons/chatSendBtn.svg";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useMemo } from "react";
import axios from "axios";
import { askai } from "../../../services/askAI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../../../assets/common/global-styles";
import LumiWithTextLeft from "../../../../assets/images/characters/lumiWithTextBubbleLeft.svg";
import LumiAskAI from "../../../../assets/images/characters/LumiAskAI.svg";
import baseURL from "../../../../assets/common/baseUrl";
import ChatLoader from "../../../../assets/images/loader/ChatLoader.gif";

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
    console.log(`${process.env.EXPO_PUBLIC_HOSTNAME_COMPLETE}/askai`);
    const submitChat = async () => {
      setLumiState(lumiHeadline[1]);
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_HOSTNAME_COMPLETE}/askai`,
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
  // console.log("chatHistory", chatHistory);

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
            // backgroundColor: globalStyles.colors.background,
            // backgroundColor: globalStyles.colors.primary,
          }}
        >
          {/* lumi */}
          <View
            // set style to lumiWrapShort base on lumistate
            style={
              lumiState === lumiHeadline[0]
                ? styles.lumiWrap
                : styles.lumiWrapShort
            }
          >
            <View style={styles.characterTextWrap}>
              <View
                style={{
                  flexDirection: "row",
                  // marginBottom: 10,
                  // backgroundColor: globalStyles.colors.primary,
                }}
              >
                {/* the box */}
                <View
                  style={{
                    // marginBottom: 10,
                    // backgroundColor: globalStyles.colors.primary,
                    justifyContent: "center",
                    // position: "relative",

                    // left: 50,
                    borderColor: "black",
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      zIndex: 1,
                      // position: "absolute",
                      // left: 10,
                      width: "90%",
                    }}
                  >
                    {lumiState}
                  </Text>
                </View>
                {/* triangle */}
                <View
                  style={{
                    // backgroundColor: "pink",
                    justifyContent: "flex-end",
                    zIndex: 1,
                  }}
                >
                  <View style={[styles.triangleBefore]}></View>
                  <View style={styles.triangleAfter}></View>
                </View>
              </View>
              {/* set LumiAskAI height base on lumistate */}
              {lumiState === lumiHeadline[0] ? (
                <LumiAskAI
                  style={{
                    // backgroundColor: "pink",
                    position: "relative",
                    left: -50,
                    // marginBottom: 10,
                    // paddingBottom: 10,
                  }}
                  height={150}
                />
              ) : (
                <LumiAskAI
                  style={{
                    // backgroundColor: "pink",
                    position: "relative",
                    left: -50,
                    // marginBottom: 10,
                    // paddingBottom: 10,
                  }}
                  height={100}
                />
              )}
            </View>
          </View>

          {/* main area */}
          <View
            style={{
              display: "flex",
              // backgroundColor: "hotpink",
              backgroundColor: globalStyles.colors.background,
              flex: 1,

              // position: "relative",
              // top: -65,

              zIndex: 1,
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
                // backgroundColor: "pink",
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

              {suggestionArray.map((suggestion, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        // backgroundColor: "pink",
                        justifyContent: "flex-end",
                        zIndex: 1,
                      }}
                    >
                      <View style={[styles.triangleBeforeLeftBlack]}></View>
                      <View style={styles.triangleAfterLeftBlack}></View>
                    </View>

                    <TouchableOpacity
                      key={index}
                      style={{
                        // marginBottom: 10,
                        justifyContent: "center",
                        position: "relative",
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 10,
                        padding: 5,
                      }}
                      onPress={() => handleSuggestionSelected(suggestion)}
                    >
                      {/* <TextBubbleRight
                      style={{ color: "black", zIndex: 0 }}
                    ></TextBubbleRight> */}

                      <Text
                        style={{
                          zIndex: 1,
                          // position: "absolute",
                          // left: 10,
                          // width: "90%",
                        }}
                      >
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              {/* </View> */}
            </View>
            <View
              style={{
                flex: 1,
                marginBottom: 5,
                marginTop: 5,
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
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
              >
                {chatHistory.map((chat, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        // flexDirection: "column",
                        flexDirection: "row",
                        // justifyContent: "end",
                        // alignItems: "end",
                        // alignItems: chat.isUser ? "flex-end" : "flex-start",
                        justifyContent: chat.isUser ? "flex-end" : "flex-start",
                        overflow: "hidden",
                        // backgroundColor: "gold",
                        // position: "relative",
                      }}
                    >
                      {/* the triangle */}
                      {chat.isUser ? null : (
                        <View
                          style={{
                            // backgroundColor: "pink",
                            justifyContent: "flex-end",
                            zIndex: 1,
                          }}
                        >
                          <View
                            style={
                              chat.isUser
                                ? styles.triangleBefore
                                : styles.triangleBeforeLeft
                            }
                          ></View>
                          <View
                            style={
                              chat.isUser
                                ? styles.triangleAfter
                                : styles.triangleAfterLeft
                            }
                          ></View>
                        </View>
                      )}
                      {/* the box */}
                      <View
                        // style={
                        //   chat.isUser
                        //     ? styles.triRightBorder
                        //     : styles.triLeftBorder
                        // }
                        style={{
                          // alignItems: chat.isUser ? "flex-end" : "flex-start",
                          // backgroundColor: chat.isUser
                          //   ? "tomato"
                          //   : "gold",
                          borderWidth: 2,
                          borderRadius: 10,
                          borderColor: chat.isUser
                            ? "black"
                            : globalStyles.colors.primary,
                          width: "60%",
                          // marginBottom: 5,
                          marginTop: 10,
                          // backgroundColor: "red",
                          backgroundColor: "white",
                          // backgroundColor: globalStyles.colors.background,
                          // display: "flex",
                          // flexDirection: "column",
                          flexDirection: "row",
                        }}
                      >
                        {/* the text */}
                        {chat.isUser ? (
                          <Text
                            style={[
                              styles.bubbleRight,
                              // styles.triRightBorder
                              // ,styles.triRightAfter, styles.triRightBorder
                            ]}
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
                      {/* <View>
                          <View style={chat.isUser ? styles.triangleBefore : styles.triangleBeforeLeft}></View>
                          <View style={chat.isUser ? styles.triangleAfter : styles.triangleAfterLeft}></View>
                        </View> */}
                      {/* the triangle */}
                      {chat.isUser ? (
                        <View
                          style={{
                            // backgroundColor: "pink",
                            justifyContent: "flex-end",
                          }}
                        >
                          <View
                            style={
                              chat.isUser
                                ? styles.triangleBefore
                                : styles.triangleBeforeLeft
                            }
                          ></View>
                          <View
                            style={
                              chat.isUser
                                ? styles.triangleAfter
                                : styles.triangleAfterLeft
                            }
                          ></View>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
        

                {lumiState == lumiHeadline[1] && (
                  <View >
                    {/* <ChatLoader /> */}
                    <Image source={ChatLoader} height={10} width={10} />
                    {/* <LumiAskAI/> */}
                  </View>
                )}
              </ScrollView>
            </View>
            {/* add the GIF if the lumistate is at [1] */}
          </View>
        </View>
        {/* input */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={{
            // flex: 1,
            // flexDirection: "column",
            // alignSelf: "flex-end",
            // justifyContent: "flex-end",
            // flexShrink: 0,
            paddingBottom: 10,
            // marginBottom: 10,
            // backgroundColor: "white",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              // backgroundColor: "orange",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
              borderRadius: 16,
              borderWidth: 2,
              borderColor: globalStyles.colors.primary,
              padding: 10,
              // width: "100%",
            }}
          >
            <TextInput
              multiline={true}
              numberOfLines={2}
              style={{ flex: 1, height: 50 }}
              value={inputText}
              onChangeText={(text) => onChangeText(text)}
            ></TextInput>
            <TouchableOpacity onPress={handleChat}>
              <ChatSendBtn />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    // backgroundColor: "red",
  },
  container: {
    flex: 1,
    display: "flex",
    // backgroundColor: globalStyles.colors.primary,
    backgroundColor: globalStyles.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lumiWrap: {
    borderBottomColor: globalStyles.colors.primary,
    borderBottomWidth: 2,

    // height: "25%",
    flexDirection: "row",
    // marginLeft: "auto",
    // marginRight: "auto",
    // marginBottom: 50,
    paddingLeft: 50,
    paddingBottom: 10,
    // paddingRight: "auto",
    // alignItems: "center",
    // justifyContent: "center",
    // justifyContent: "flex-end",

    // backgroundColor: "red",
    // backgroundColor: globalStyles.colors.background,
    // paddingBottom: 10,
  },
  lumiWrapShort: {
    borderBottomColor: globalStyles.colors.primary,
    borderBottomWidth: 2,
    paddingLeft: 50,
    // paddingBottom: 10,
    flexDirection: "row",
    height: "10%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  characterTextWrap: {
    width: "100%",
    // position: "relative",
    // backgroundColor: "red",
    height: "100%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    // paddingBottom: 10,
    // marginBottom : 10,
  },
  textCharacter: {
    position: "absolute",
    top: 25,
    left: 50,
    width: "35%",
    zIndex: 1,
    color: globalStyles.colors.textColor,
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  character: {
    zIndex: 0,
    // backgroundColor: "orange",
  },
  triRightBorder: {
    // margin: 40,
    // display: "inline-block",
    // position: "absolute",
    // width: 200,
    // height: "auto",
    // backgroundColor: "lightyellow",
    // position: "absolute",
    // width: 0,
    // height: 0,
    // left: 30,
    // right: "auto",
    // top: "auto",
    // bottom: -40,
    // borderWidth: 20,
    // borderStyle: "solid",
    // borderColor: "#666 transparent transparent #666",

    // position: "absolute",
    width: 0,
    // height: 0,
    top: 0,
    // left: -40,
    borderLeftWidth: 16, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 16,
    borderStyle: "solid",
    backgroundColor: "orange",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#666",

    // alignItems: "flex-end" ,
    // //   // backgroundColor: chat.isUser
    // //   //   ? "tomato"
    // //   //   : "gold",
    // borderWidth: 2,
    borderRadius: 16,
    // borderColor: "black",

    width: "60%",
    marginBottom: 5,
    marginTop: 5,
  },
  triLeftBorder: {
    // margin: 40,
    // display: "inline-block",
    // position: "relative",
    // width: 200,
    // height: "auto",
    // backgroundColor: "lightyellow",
    // position: "absolute",
    // width: 0,
    // height: 0,
    // right: 30,
    // left: "auto",
    // top: "auto",
    // bottom: -40,
    // borderWidth: 20,
    // borderStyle: "solid",
    // borderColor: "#666 transparent transparent #666",

    alignItems: "flex-start",
    //   // backgroundColor: chat.isUser
    //   //   ? "tomato"
    //   //   : "gold",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "black",

    width: "60%",
    marginBottom: 5,
    marginTop: 5,
  },

  bubbleRight: {
    // zIndex: 1,
    textAlign: "right",
    width: "100%",
    // right: 10,
    // top: 10,
    padding: 5,
  },
  bubbleLeft: {
    // zIndex: 1,
    textAlign: "left",
    width: "100%",
    padding: 5,
  },
  triangleContainer: {
    // position: "relative",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
    padding: 20,
  },
  triangleBefore: {
    // position: "absolute",
    width: 0,
    height: 0,
    bottom: 0,
    top: 4,
    // top: "auto",
    left: -1,
    top: 1,
    // left: 40,
    right: "auto",
    borderLeftWidth: 5, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 5,
    borderRightWidth: 0,
    borderTopWidth: 5,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "black",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
  },
  triangleAfter: {
    zIndex: 1,
    // position: 'absolute',
    width: 0,
    height: 0,
    // left: 5,
    // left: 45,
    right: 3,
    // top: -18,
    top: -8,
    bottom: 0,
    borderLeftWidth: 4, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 4,
    borderRightWidth: 0,
    borderTopWidth: 4,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: globalStyles.colors.background,
    // borderLeftColor: "white",
    // borderLeftColor: "gold",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    // borderColor: 'lightyellow transparent transparent lightyellow',
  },
  triangleBeforeLeft: {
    // position: "absolute",
    width: 0,
    height: 0,
    bottom: 0,
    top: 2,
    // top: "auto",
    // left: 0,
    left: 0,
    right: "auto",
    borderLeftWidth: 0, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    // borderRightColor: "green",
    borderRightColor: globalStyles.colors.primary,
    borderTopColor: "transparent",
  },
  triangleAfterLeft: {
    zIndex: 1,
    // position: 'absolute',
    width: 0,
    height: 0,
    // left: 5,
    left: 3,
    // left: 3,
    right: -2,
    top: -8,
    // top: -10,
    bottom: 0,
    borderLeftWidth: 0, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: globalStyles.colors.background,
    // borderRightColor: "white",
    // borderRightColor: "gold",
    borderTopColor: "transparent",
    // borderColor: 'lightyellow transparent transparent lightyellow',
  },
  triangleBeforeLeftBlack: {
    // position: "absolute",
    width: 0,
    height: 0,
    bottom: 0,
    top: 2,
    // top: "auto",
    // left: 0,
    left: 0,
    right: "auto",
    borderLeftWidth: 0, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    // borderRightColor: "green",
    borderRightColor: "black",
    borderTopColor: "transparent",
  },
  triangleAfterLeftBlack: {
    zIndex: 1,
    // position: 'absolute',
    width: 0,
    height: 0,
    // left: 5,
    // left: 3,
    left: 3,
    right: -3,
    top: -8,
    // top: -10,
    bottom: 0,
    borderLeftWidth: 0, // Adjust these values as needed to create the desired shape
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    // borderRightColor: "gold",
    borderRightColor: globalStyles.colors.background,
    borderTopColor: "transparent",
    // borderColor: 'lightyellow transparent transparent lightyellow',
  },
});
