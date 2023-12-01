import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";

const AnimatedIcon = ({ route }) => {
  const [showIcon, setShowIcon] = useState();

  useEffect(() => {
    const renderActiveIcons = () => {
      if (route == "StudyHome") {
        setShowIcon(
          <LottieView
            source={require("../../../../assets/icons/NavBar/Study/data.json")}
            autoPlay
            loop
            // loop={false}
            style={{
              height: "90%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 3.5,
            }}
          />
        );
      }
      if (route == "Progress") {
        setShowIcon(
          <LottieView
            source={require("../../../../assets/icons/NavBar/Progress/data.json")}
            autoPlay
            loop
            // loop={false}
            style={{
              height: "90%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 3.5,
            }}
          />
        );
      }
      if (route == "DailyHome") {
        setShowIcon(
          <LottieView
            source={require("../../../../assets/icons/NavBar/Daily/data.json")}
            autoPlay
            loop
            // loop={false}
            style={{
              height: "90%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 3.5,
            }}
          />
        );
      }
      if (route == "Account") {
        setShowIcon(
          <LottieView
            source={require("../../../../assets/icons/NavBar/Profile/data.json")}
            autoPlay
            // loop
            loop={false}
            style={{
              height: "90%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 3.5,
            }}
          />
        );
      }
    };
    renderActiveIcons();
  }, [route]);
  const renderActiveIcons = () => {
    if (route == "StudyHome") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Study/data.json")}
          autoPlay
          loop
          // loop={false}
          style={{
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 3.5,
          }}
        />
      );
    }
    if (route == "Progress") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Progress/data.json")}
          autoPlay
          loop
          // loop={false}
          style={{
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 3.5,
          }}
        />
      );
    }
    if (route == "DailyHome") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Daily/data.json")}
          autoPlay
          loop
          // loop={false}
          style={{
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 3.5,
          }}
        />
      );
    }
    if (route == "Account") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Profile/data.json")}
          autoPlay
          // loop
          loop={false}
          style={{
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 3.5,
          }}
        />
      );
    }
  };
  return (
    <View>
      {showIcon}
      {/* {renderActiveIcons()} */}
      {/* <Text>AnimatedIcon</Text> */}
    </View>
  );
};

export default AnimatedIcon;
