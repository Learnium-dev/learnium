import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// styles
import { styles } from "./styles/createContent";

// components
import UploadContent from "./components/FormStepper/UploadContent";
import PurposeContent from "./components/FormStepper/PurposeContent";
import GrowProf from "./components/FormStepper/GrowProf";
import LearningTime from "./components/FormStepper/LearningTime";
import ExamSchedule from "./components/FormStepper/ExamSchedule";

const CreateContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {/* <UploadContent name="Create Content" /> */}

        {/* <PurposeContent name="Why are you creating this course?" /> */}

        {/* <GrowProf name="Grow Professionally" /> */}

        {/* <LearningTime name="Learning For Fun" /> */}

        <ExamSchedule name="Exam Schedule" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateContent;
