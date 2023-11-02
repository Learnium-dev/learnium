import { View, Text, Pressable, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

// Components
import HeaderNoBar from "../HeaderNoBar";

// Styles
import { styles } from "../../styles/createContent";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../../../../../slices/examSlice";

// SVGs
import LumiCamera from "../../../../../../assets/images/characters/create content/lumi_picture.svg";
import LumiPdf from "../../../../../../assets/images/characters/create content/lumi_pdf.svg";

// Navigation
import { useNavigation } from "@react-navigation/native";

const UploadContent = ({ name, next }) => {
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

  return (
    <View>
      {/* Buttons */}
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.uploadBtn}
          onPress={() => navigate("TakePhoto")}
        >
          <LumiCamera width={84} height={110} />
          <Text style={styles.btnText}>Take Picture</Text>
        </Pressable>
        <Pressable style={styles.uploadBtn}>
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
