import APlus from "../assets/images/progress/grades/a_plus.svg";
import CPlus from "../assets/images/progress/grades/c_plus.svg";
import Inactive from "../assets/images/progress/grades/inactive.svg";

export const getLumi = (score) => {
  if (score >= 85) {
    return <APlus />;
  } else if (score < 85 && score > 0) {
    return <CPlus />;
  } else {
    return <Inactive />;
  }
};
