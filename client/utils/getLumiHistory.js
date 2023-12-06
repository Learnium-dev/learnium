// Import necessary assets and libraries
import APlus from "../assets/images/characters/quiz history/APlusH.svg";
import APlusBig from "../assets/images/characters/quiz history/APlusHBig.svg";
import APlain from "../assets/images/characters/quiz history/APlainH.svg";
import AMinus from "../assets/images/characters/quiz history/AMinusH.svg";
import BPlus from "../assets/images/characters/quiz history/BPlusH.svg";
import BMinus from "../assets/images/characters/quiz history/BMinusH.svg";

// Function to get corresponding Lumi based on score
export const getLumiHistory = (score) => {
  if (score === 100) {
    return <APlus width={200} height={200} />;
  } else if (score >= 95 && score < 100) {
    return <APlain width={200} height={200} />;
  } else if (score >= 90 && score < 95) {
    return <AMinus width={200} height={200} />;
  } else if (score >= 85 && score < 90) {
    return <BPlus width={200} height={200} />;
  } else {
    return <BMinus width={200} height={200} />;
  }
};
