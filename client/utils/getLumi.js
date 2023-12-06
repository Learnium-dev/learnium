// Import necessary assets and libraries
import APlus from "../assets/images/progress/grades/a_plus_lumi.svg";
import AMinus from "../assets/images/progress/grades/AMinus.svg";
import AOnly from "../assets/images/progress/grades/A.svg";
import BPlus from "../assets/images/progress/grades/BPlus.svg";
import BMinus from "../assets/images/progress/grades/BMinus.svg";
import CPlus from "../assets/images/progress/grades/c_plus_lumi.svg";
import LottieView from "lottie-react-native";

// Function to get corresponding Lumi based on score
export const getLumi = (score) => {
  if (score === 99.99) {
    return <APlus />;
  } else if (score >= 95 && score < 99.99) {
    return <AOnly />;
  } else if (score >= 90 && score < 95) {
    return <AMinus />;
  } else if (score >= 85 && score < 90) {
    return <BPlus />;
  } else if (score >= 66.66 && score < 85) {
    return <BMinus />;
  } else if (score < 66.66 && score > 0) {
    return <CPlus />;
  } else {
    // Default Lottie animation for scores outside the defined range
    return (
      <LottieView
        source={require("../assets/icons/Study/sleeping_lumi.json")}
        autoPlay
        loop
        style={{ width: 114, height: 134 }}
      />
    );
  }
};

// export const getLumi = (score) => {
//   return <CPlus />;
// };
