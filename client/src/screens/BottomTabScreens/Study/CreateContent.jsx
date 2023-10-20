import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
// pdf reader
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

// axios
import axios from "axios";

const CreateContent = () => {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateContent = async () => {
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

      const response = await axios.post(
        "http://10.128.243.187:3000/create-content",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      setContent(JSON.parse(data));
      setIsLoading(false);
    } catch (error) {
      console.log(error?.message);
      setIsLoading(false);
    }
  };

  console.log("Summary: ", content?.summary);
  console.log("Key Topics: ", content?.keyTopic);
  console.log("Question and Answer: ", content?.questionAnswer);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create content based on the PDF</Text>
      <Pressable style={styles.button} onPress={handleCreateContent}>
        <Text style={styles.buttonText}>Create your content</Text>
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
          ) : content && content.summary ? (
            <>
              <Text style={styles.subtitle}>Summary</Text>
              <Text>{content && content?.summary}</Text>
              <Text style={styles.subtitle}>Key Topics</Text>
              {content?.keyTopic.map((topic, index) => (
                <Text key={index}>{topic}</Text>
              ))}
              <Text style={styles.subtitle}>Question and Answer</Text>
              {content?.questionAnswer.map((item, index) => (
                <View key={index}>
                  <Text style={{ fontWeight: "bold" }}>{item.question}</Text>
                  <Text>{item.answer}</Text>
                  <Text>{item.keyTopic}</Text>
                </View>
              ))}
            </>
          ) : (
            <Text>No content available yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  button: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 20,
    padding: 20,
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CreateContent;
