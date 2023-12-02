import { View, Dimensions } from "react-native";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

// styles
import { styles } from "./styles/createContent";

// redux
import { useSelector } from "react-redux";

// components
import UploadContent from "./components/FormStepper/UploadContent";
import PurposeContent from "./components/FormStepper/PurposeContent";
import GrowProf from "./components/FormStepper/GrowProf";
import LearningTime from "./components/FormStepper/LearningTime";
import ExamSchedule from "./components/FormStepper/ExamSchedule";
import Header from "./components/Header";
import { useNavigation } from "@react-navigation/native";

const CreateContent = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [currentStep, setCurrentStep] = useState(0);
  const [purpose, setPurpose] = useState("");
  const { days, date } = useSelector((state) => state.exam);

  const handleNextStep = () => {
    if (currentStep < 4) {
      if (purpose === "exam") {
        setCurrentStep(4);
      } else if (purpose === "pro") {
        setCurrentStep(2);
      } else if (purpose === "fun") {
        setCurrentStep(3);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 0) navigation.goBack();
    if (currentStep > 0) {
      if (!purpose) {
        setCurrentStep(0);
      } else {
        setCurrentStep(1);
      }
    }
  };

  const handleFinish = () => {
    setCurrentStep(0);
  };

  return (
    <View style={{ height: windowHeight }}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexGrow: 1,
            // backgroundColor: "green",
          }}
        >
          {/* Header */}
          <Header step={currentStep} back={handlePreviousStep} />
          {currentStep === 0 && (
            <UploadContent
              name="Upload Content"
              next={handleNextStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 1 && (
            <PurposeContent next={handleNextStep} setPurpose={setPurpose} />
          )}
          {currentStep === 2 && <GrowProf next={handleNextStep} />}
          {currentStep === 3 && <LearningTime next={handleNextStep} />}
          {currentStep === 4 && <ExamSchedule next={handleFinish} />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateContent;
