import { View, Text, StyleSheet, Pressable } from "react-native";

// react navigation imports
import { useNavigation } from "@react-navigation/native";

// react hooks
import { useState } from "react";

// pdf reader
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const Study = () => {
  const { navigate } = useNavigation();
  const [pdfContent, setPdfContent] = useState("");

  const handleUploadPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log(res);
      const pdfUri = res.assets[0].uri;
      const pdfBase64 = await FileSystem.readAsStringAsync(pdfUri, {
        encoding: "base64",
      });
      console.log("this is the pdfBas64", pdfBase64);
      // setPdfContent(pdfBase64);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Study</Text>
      <Pressable
        onPress={handleUploadPDF}
        style={{
          padding: 20,
          backgroundColor: "#000",
          borderRadius: 5,
          margin: 50,
          width: 200,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Upload a file PDF
        </Text>
      </Pressable>
      <Text>{pdfContent}</Text>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("KeyTopic")}
      >
        <Text>Go to KeyTopic</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("AllMaterials")}
      >
        <Text>Go to AllMaterials</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("CreateNewMaterial")}
      >
        <Text>Go to CreateNewMaterial</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("NextDayPlan")}
      >
        <Text>Go to NextDayPlan</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Study;
