import { View, Text, Pressable, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

// Components
import HeaderNoBar from "../HeaderNoBar";

// Styles
import { styles } from "../../styles/createContent";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../../../../../slices/examSlice";
import { setUploaded } from "../../../../../../slices/examSlice";

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

const UploadContent = ({ name, next }) => {
  const { token } = useSelector((state) => state.credentials);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.exam);
  const [text, setText] = useState(content);

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
    setIsLoading(true);

    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log(res);

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
      dispatch(setUploaded(true));
      setIsLoading(false);
      console.log("PDF UPLOADED SUCCESSFULLY! 🚀🚀🚀", data);
      // !temporarily commented out postToDB(JSON.parse(data)) to post the content to the database without calling the openAI API
      // postFolderToDB(dataJson);
      // postFolderIsDone && postMaterialToDB();

      // postToDB(JSON.parse(data));
    } catch (error) {
      console.log(error?.message);
    }
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
        {/* Buttons */}
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.uploadBtn}
            onPress={() => navigate("TakePhoto")}
          >
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
