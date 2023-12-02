import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";

// Icons Active - animated
import LottieView from "lottie-react-native";
import AnimatedIcon from "./AnimatedIcon";

// Icons Inactive
import StudyTabIcon from "../../../../assets/icons/study_icon.svg";
import ProgressTabIcon from "../../../../assets/icons/progress-tab.svg";
import DailyTabIcon from "../../../../assets/icons/daily-tab.svg";
import ProfileTabIcon from "../../../../assets/icons/profile-tab.svg";

// global style
import { globalStyles } from "../../../../assets/common/global-styles";

const CustomIcon = ({ route, active }) => {
  const [showIcon, setShowIcon] = useState();
  useEffect(() => {
    const renderActiveIcons = () => {
      if (route == "StudyHome") {
        setShowIcon(
          <View
            style={{
              borderColor: globalStyles.colors.primary,
              borderWidth: 2,
              borderRadius: 8,

              padding: 3,
            }}
          >
            <LottieView
              source={require("../../../../assets/icons/NavBar/Study/data.json")}
              autoPlay
              loop={false}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        );
      }
      if (route == "Progress") {
        setShowIcon(
          <View
            style={{
              borderColor: globalStyles.colors.primary,
              borderWidth: 2,
              borderRadius: 8,

              padding: 3,
            }}
          >
            <LottieView
              source={require("../../../../assets/icons/NavBar/Progress/data.json")}
              autoPlay
              loop={false}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        );
      }
      if (route == "DailyHome") {
        setShowIcon(
          <View
            style={{
              borderColor: globalStyles.colors.primary,
              borderWidth: 2,
              borderRadius: 8,

              padding: 3,
            }}
          >
            <LottieView
              source={require("../../../../assets/icons/NavBar/Daily/data.json")}
              autoPlay
              loop={false}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        );
      }
      if (route == "Account") {
        setShowIcon(
          <View
            style={{
              borderColor: globalStyles.colors.primary,
              borderWidth: 2,
              borderRadius: 8,

              padding: 3,
            }}
          >
            <LottieView
              source={require("../../../../assets/icons/NavBar/Profile/data.json")}
              autoPlay
              loop={false}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        );
      }
    };
    renderActiveIcons();
  }, [route]);

  const inactiveIcons = {
    StudyHome: <StudyTabIcon />,
    Progress: <ProgressTabIcon />,
    DailyHome: <DailyTabIcon />,
    Account: <ProfileTabIcon />,
  };
  const renderActiveIcons = () => {
    if (route == "StudyHome") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Study/data.json")}
          autoPlay
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
    if (route == "Account") {
      return (
        <LottieView
          source={require("../../../../assets/icons/NavBar/Profile/data.json")}
          autoPlay
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

  const activeIcons = {
    StudyHome: (
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
    ),
    Progress: (
      <LottieView
        source={require("../../../../assets/icons/NavBar/Progress/data.json")}
        autoPlay
        loop={false}
        style={{
          height: "90%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 3.5,
        }}
      />
    ),
    DailyHome: (
      <LottieView
        source={require("../../../../assets/icons/NavBar/Daily/data.json")}
        autoPlay
        loop={false}
        style={{
          height: "90%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 3.5,
        }}
      />
    ),
    Account: (
      <LottieView
        source={require("../../../../assets/icons/NavBar/Profile/data.json")}
        autoPlay
        loop={false}
        style={{
          height: "90%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 3.5,
        }}
      />
    ),
  };

  return (
    <>
      {active ? (
        <View
          style={
            {
              // borderColor: globalStyles.colors.primary,
              // borderWidth: 2,
              // borderRadius: 8,
              // width: "50%",
              // height: "100%",
              // backgroundColor: "red",
              // padding:10
            }
          }
        >
          {showIcon}
          {/* <View style={{width:10, height:10 , backgroundColor:"gold"}}></View> */}
          {/* <AnimatedIcon route={route} /> */}
          {/* {renderActiveIcons()} */}
          {/* {activeIcons[route]} */}
        </View>
      ) : (
        inactiveIcons[route]
      )}
    </>
  );
};

export default CustomIcon;
