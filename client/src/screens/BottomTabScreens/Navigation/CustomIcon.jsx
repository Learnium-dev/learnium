import { View, Text } from 'react-native'
import React from 'react'

// Icons Active - animated
import LottieView from "lottie-react-native";

// Icons Inactive
import StudyTabIcon from "../../../../assets/icons/study_icon.svg";
import ProgressTabIcon from "../../../../assets/icons/progress-tab.svg";
import DailyTabIcon from "../../../../assets/icons/daily-tab.svg";
import ProfileTabIcon from "../../../../assets/icons/profile-tab.svg";


const CustomIcon = ({route, active}) => {
   const inactiveIcons = {
        StudyHome: <StudyTabIcon/>,
        Progress: <ProgressTabIcon />,
        DailyHome: <DailyTabIcon />,
        Account: <ProfileTabIcon />,
      };

    const activeIcons = {
        StudyHome: <LottieView source={require("../../../../assets/icons/NavBar/Study/data.json")} autoPlay  loop={false} />,
        Progress: <LottieView source={require("../../../../assets/icons/NavBar/Progress/data.json")} autoPlay  loop={false} />,
        DailyHome: <LottieView source={require("../../../../assets/icons/NavBar/Daily/data.json")} autoPlay  loop={false} />,
        Account: <LottieView source={require("../../../../assets/icons/NavBar/Profile/data.json")} autoPlay loop={false} />,
    };


  return (
    <>
    {
        active ? activeIcons[route] : inactiveIcons[route]
    }
    </>
  )
}

export default CustomIcon

