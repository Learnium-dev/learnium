import { View, Text, Pressable, TextInput, Button } from "react-native";
import { useState } from "react";

// Components
import HeaderNoBar from "../HeaderNoBar";

// Styles
import { styles } from "../../styles/createContent";

// redux
import { useSelector } from "react-redux";

// SVGs
import LumiCamera from "../../../../../../assets/images/characters/create content/lumi_picture.svg";
import LumiPdf from "../../../../../../assets/images/characters/create content/lumi_pdf.svg";

// Navigation
import { useNavigation } from "@react-navigation/native";

const UploadContent = ({ name, next }) => {
  const [disabled, setDisabled] = useState(true);
  const [text, setText] = useState("");
  const { navigate } = useNavigation();
  const { content } = useSelector((state) => state.exam);

  const handleTextChange = (inputText) => {
    setText(inputText);
    if (inputText.trim().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
        on
        underlineColorAndroid={"transparent"}
        placeholder="Paste your text here..."
        numberOfLines={15}
        multiline
        value={content}
        onChangeText={handleTextChange}
        textAlignVertical="top"
        style={styles.textarea}
      />

      {/* Create Course Button */}
      <Pressable
        disabled={disabled}
        style={[styles.btnContent, disabled && styles.btnDisabled]}
        onPress={next}
      >
        <Text style={[styles.btnTextOption, disabled && styles.textDisabled]}>
          Create Course
        </Text>
      </Pressable>
    </View>
  );
};

export default UploadContent;
