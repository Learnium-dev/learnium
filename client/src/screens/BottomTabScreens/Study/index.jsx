import { View, Text, StyleSheet, Pressable } from "react-native";

// react navigation imports
import { useNavigation } from "@react-navigation/native";

// react hooks
import { useState, useEffect } from "react";

// pdf reader
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

// axios
import axios from "axios";

const Study = () => {
  const { navigate } = useNavigation();

  const handleUploadPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log(res);

      const formData = new FormData();
      formData.append("pdf", {
        uri: res.assets[0].uri,
        name: res.assets[0].name,
        type: res.assets[0].mimeType,
      });

      const response = await axios.post(

        "http://192.168.1.155:3000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Study</Text>
      {/* <Pressable
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
      </Pressable> */}
      <Pressable
        onPress={() => navigate("CreateContent")}
        style={{
          padding: 20,
          backgroundColor: "#000",
          borderRadius: 5,
          margin: 50,
          width: 200,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Go to Create Content
        </Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigate("UploadScreen")}
      >
        <Text>Go to UploadScreen</Text>
      </Pressable>
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
