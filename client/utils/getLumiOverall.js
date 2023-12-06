// Import necessary assets and libraries
import APlus from "../assets/images/progress/grades/overall/APlusO.svg";
import APlain from "../assets/images/progress/grades/overall/APlainO.svg";
import AMinus from "../assets/images/progress/grades/overall/AMinusO.svg";
import BPlus from "../assets/images/progress/grades/overall/BPlusO.svg";
import BMinus from "../assets/images/progress/grades/overall/BMinusO.svg";

// Function to get corresponding Lumi based on score
export const getLumiOverall = (score) => {
  if (score === 100) {
    return <APlus width={140} height={125} />;
  } else if (score >= 95 && score < 100) {
    return <APlain width={140} height={125} />;
  } else if (score >= 90 && score < 95) {
    return <AMinus width={140} height={125} />;
  } else if (score >= 85 && score < 90) {
    return <BPlus width={140} height={125} />;
  } else {
    return <BMinus width={140} height={125} />;
  }
};
