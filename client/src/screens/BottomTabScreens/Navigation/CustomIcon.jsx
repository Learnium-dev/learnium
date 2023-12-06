import { View, Text } from "react-native";
import { useRef, useEffect } from "react";

// Icons Active - animated
import LottieView from "lottie-react-native";

// Icons Inactive
import StudyTabIcon from "../../../../assets/icons/study_icon.svg";
import ProgressTabIcon from "../../../../assets/icons/progress-tab.svg";
import DailyTabIcon from "../../../../assets/icons/daily-tab.svg";
import ProfileTabIcon from "../../../../assets/icons/profile-tab.svg";

const CustomIcon = ({ route, active }) => {
  const animation = useRef(null);

  const inactiveIcons = {
    StudyHome: <StudyTabIcon />,
    Progress: <ProgressTabIcon />,
    DailyHome: <DailyTabIcon />,
    Account: <ProfileTabIcon />,
  };

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        animation.current?.play();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const activeIcons = {
    StudyHome: (
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <LottieView
          ref={animation}
          source={require("../../../../assets/icons/NavBar/Study/data.json")}
          autoPlay
          loop={false}
        />
      </View>
    ),
    Progress: (
      <View
        style={{
          width: 30,
          height: 30,
        }}
      >
        <LottieView
          ref={animation}
          source={require("../../../../assets/icons/NavBar/Progress/data.json")}
          autoPlay
          loop={false}
        />
      </View>
    ),
    DailyHome: (
      <View
        style={{
          width: 30,
          height: 30,
        }}
      >
        <LottieView
          ref={animation}
          source={require("../../../../assets/icons/NavBar/Daily/data.json")}
          autoPlay
          loop={false}
        />
      </View>
    ),
    Account: (
      <View
        style={{
          width: 30,
          height: 30,
        }}
      >
        <LottieView
          ref={animation}
          source={require("../../../../assets/icons/NavBar/Profile/data.json")}
          autoPlay
          loop={false}
        />
      </View>
    ),
  };

  useEffect(() => {
    if (animation.current) {
      // Start the animation when the component mounts
      animation.current.play();
    }

    return () => {
      // Stop the animation when the component unmounts
      if (animation.current) {
        animation.current.reset();
      }
    };
  }, [route]);

  return active ? (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: "#7000FF",
        backgroundColor: "rgba(112,0,255, 0.1)",
        paddingBottom: 5,
        borderRadius: 8,
      }}
    >
      {active ? activeIcons[route] : inactiveIcons[route]}
    </View>
  ) : (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
      }}
    >
      {active ? activeIcons[route] : inactiveIcons[route]}
    </View>
  );
};

export default CustomIcon;
