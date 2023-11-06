import { View, Text, Pressable, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

// Components
import HeaderNoBar from "../HeaderNoBar";

// Styles
import { styles } from "../../styles/createContent";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setContent, setPDFName } from "../../../../../../slices/examSlice";
import { setUploaded } from "../../../../../../slices/examSlice";

// Camera
import * as ImagePicker from "expo-image-picker";

// SVGs
import LumiCamera from "../../../../../../assets/images/characters/create content/lumi_picture.svg";
import LumiPdf from "../../../../../../assets/images/characters/create content/lumi_pdf.svg";

// Navigation
import { useNavigation } from "@react-navigation/native";

// pdf reader
import * as DocumentPicker from "expo-document-picker";

// axios
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import ModalCamera from "../ModalCamera";

const UploadContent = ({ name, next, setCurrentStep }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.credentials);
  const { content } = useSelector((state) => state.exam);
  const [disabled, setDisabled] = useState(true);
  const [text, setText] = useState(content);
  // State to hold the selected image
  const [image, setImage] = useState(null);

  const handlePress = () => {
    dispatch(setContent(text));
    next();
  };

  useEffect(() => {
    if (content) {
      setText(content);
    }
  }, [content]);

  useEffect(() => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text]);

  const handleTextChange = (text) => {
    setText(text);
  };

  const handleUploadPDF = async () => {
    console.log("Loading......");
    dispatch(setUploaded(false));
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log("this is the pdf content: ", res?.assets[0]?.name);
      // remove the .pdf extension from the name
      const name = res?.assets[0]?.name;
      const pdfname = name.split(".")[0];
      dispatch(setPDFName(pdfname));

      const formData = new FormData();
      formData.append("pdf", {
        uri: res.assets[0].uri,
        name: res.assets[0].name,
        type: res.assets[0].mimeType,
      });
      next();
      // console.log("hey this is token", token);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_HOSTNAME}/create-content`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("PDF UPLOADED SUCCESSFULLY! 🚀🚀🚀", data);
      dispatch(setUploaded(true));
      // !temporarily commented out postToDB(JSON.parse(data)) to post the content to the database without calling the openAI API
      // postFolderToDB(dataJson);
      // postFolderIsDone && postMaterialToDB();

      // postToDB(JSON.parse(data));
      setContent(4);
    } catch (error) {
      console.log("Something bad happened..." + error?.message);
    }
  };

  // Camera functionality
  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      // Perform OCR on the captured image
      // Set the captured image in state
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  // Function to perform OCR on an image
  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20");
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file;
    let requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    };

    // Send a POST request to the OCR API
    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Set the extracted text in redux
        dispatch(setContent(result["all_text"]));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          flex: 1,
          // backgroundColor:"gold"
        }}
      >
        {/* <ModalCamera isOpened={isOpened} setIsOpened={setIsOpened} /> */}
        {/* Buttons */}
        <View style={styles.btnContainer}>
          <Pressable style={styles.uploadBtn} onPress={pickImageCamera}>
            <LumiCamera width={84} height={110} />
            <Text style={styles.btnText}>Take Picture</Text>
          </Pressable>
          <Pressable style={styles.uploadBtn} onPress={handleUploadPDF}>
            <LumiPdf width={84} height={110} />
            <Text style={styles.btnText}>Upload PDF</Text>
          </Pressable>
        </View>

        {/* Divider Text */}
        <View>
          <Text style={styles.dividerText}>OR</Text>
        </View>

        {/* Paste Text */}
        <Text style={styles.subtitle}>Paste Text</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          style={{
            // backgroundColor:"pink",
            // flex: 1,
            marginBottom: 20,
            overflow: "scroll",
          }}
        >
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Paste your text here..."
            numberOfLines={15}
            multiline
            onChangeText={handleTextChange}
            value={text}
            textAlignVertical="top"
            style={styles.textarea}
          />
        </ScrollView>
      </View>
      {/* Create Course Button */}
      <Pressable
        disabled={disabled}
        style={[styles.btnContent, disabled && styles.btnDisabled]}
        onPress={handlePress}
      >
        <Text style={[styles.btnTextOption, disabled && styles.textDisabled]}>
          Create Course
        </Text>
      </Pressable>
    </View>
  );
};

export default UploadContent;
