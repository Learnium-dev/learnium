import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// pdf reader
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
// take a photo
import { useNavigation } from '@react-navigation/native';
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
   // take a photo page
  const { navigate } = useNavigation();
  
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

  console.log("content", content);
  //  console.log("content.topics[1]", content?.topics[1]);
  console.log("Summary: ", content?.summary);
  console.log("Key Topics: ", content?.keyTopic);
  console.log("Question and Answer: ", content?.questionAnswer);

  return (
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
                    <Text style={{ fontWeight: "bold" }}>FlashCards=</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateContent;
