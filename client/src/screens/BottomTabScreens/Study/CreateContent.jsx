import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// pdf reader
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
// take a photo
import { useNavigation } from "@react-navigation/native";
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

const CreateContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [purpose, setPurpose] = useState("");
  const { days, date } = useSelector((state) => state.exam);
  console.log("Days: ", days || "");
  console.log("Date: ", date || "");

  console.log("CUrrent Step: ", currentStep);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {currentStep === 0 && (
          <UploadContent name="Upload Content" next={handleNextStep} />
        )}
        {currentStep === 1 && (
          <PurposeContent
            name="Why are you creating this course?"
            prev={handlePreviousStep}
            next={handleNextStep}
            setPurpose={setPurpose}
          />
        )}
        {currentStep === 2 && (
          <GrowProf
            name="Grow Professionally"
            prev={handlePreviousStep}
            next={handleNextStep}
          />
        )}
        {currentStep === 3 && (
          <LearningTime
            name="Learn For Fun"
            prev={handlePreviousStep}
            next={handleNextStep}
          />
        )}
        {currentStep === 4 && (
          <ExamSchedule
            name="Exam Schedule"
            prev={handlePreviousStep}
            next={handleFinish}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateContent;

{
  /* return (
    <View style={styles.container}>
      <Text style={styles.title}>Create content based on the PDF</Text>
      <Pressable style={styles.button} onPress={handleCreateContent}>
        <Text style={styles.buttonText}>Create your content</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigate("TakePhoto")}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={postFolderToDB}>
        <Text style={styles.buttonText}>POST TO DB</Text>
      </Pressable>
      <ScrollView style={styles.scrollView}>
        <View>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="orange" />
              <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                Loading...
              </Text>
            </View>
          ) : content ? (
            // <Text>ddddd</Text>
            <View>
              <Text style={{ fontWeight: "bold" }}>title: </Text>
              <Text style={{ fontWeight: "normal" }}>{content.material} </Text>
              {content?.content.map((i, index) => {
                return (
                  <View key={index}>
                    <Text style={{ fontWeight: "bold" }}>Key Topic=</Text>
                    <Text style={{ fontWeight: "normal" }}>{i.keyTopic}</Text>
                    <Text style={{ fontWeight: "bold" }}>Summary</Text>
                    <Text>{i.summary}</Text>
                    <Text style={{ fontWeight: "bold" }}>FlashCards=</Text> */
}
