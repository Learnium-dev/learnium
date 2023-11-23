import APlus from "../assets/images/progress/grades/a_plus_lumi.svg";
import CPlus from "../assets/images/progress/grades/c_plus_lumi.svg";
import Inactive from "../assets/images/progress/grades/inactive.svg";

// Lottie
import LottieView from "lottie-react-native";

export const getLumi = (score) => {
  if (score >= 85) {
    return <APlus />;
  } else if (score < 85 && score > 0) {
    return <CPlus />;
  } else {
    // return <Inactive />;
    return <LottieView source={require("../assets/icons/Study/sleeping_lumi.json")} autoPlay loop style={{width: 114, height: 134}} />
  }
};
