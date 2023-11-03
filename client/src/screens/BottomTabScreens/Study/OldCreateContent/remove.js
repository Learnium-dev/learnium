import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
// pdf reader
import * as DocumentPicker from "expo-document-picker";

// axios
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUploaded } from "../../../../../slices/examSlice";

const CreateContent = () => {
  const { token } = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("why jwt for userID not showing");
  const [folderResponse, setFolderResponse] = useState({});
  const [postFolderIsDone, setPostFolderIsDone] = useState(false);

  const handleCreateContent = async () => {
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

      console.log("hey this is token", token);
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

  const postFolderToDB = async (dataJson) => {
    try {
      const newFolderData = {
        name: "test10", // Replace with the actual folder name you want to create
        userid: userId, // Replace with the actual user ID
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFolderData),
      };

      const folderRes = await fetch(
        `http://192.168.1.100:3000/api/v1/folders`,
        requestOptions
      );

      if (!folderRes.ok) {
        const error = folderRes.status;
        throw new Error(`Network response was not ok ${error}`);
      }
      console.log("folderRes");
      const folderData = await folderRes.json();
      console.log("folderData", folderData);
      setFolderResponse(folderData);
      setPostFolderIsDone(true);
      // !create another call to POST material to the database, using the folder ID from the response above, and the POST response from the openAI API to keyTopic, summary, and flashcard
      postMaterialToDB(folderData._id, dataJson);
    } catch (error) {
      console.log("catch", error);
    }
  };

  const postMaterialToDB = async (folderDataid, dataJson) => {
    try {
      const newMaterialData = {
        folderid: folderDataid,
        name: dataJson.material,
        content: "10",
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMaterialData),
      };

      const materialRes = await fetch(
        `http://192.168.1.100:3000/api/v1/materials`,
        requestOptions
      );
      if (!materialRes.ok) {
        const error = materialRes.status;
        throw new Error(
          `postMaterialToDB:Network response was not ok ${error}`
        );
      }
      console.log("materialRes");
      const materialData = await materialRes.json();
      console.log(materialData);
      postkeyTopicToDB(materialData, dataJson);
    } catch (error) {
      console.log("postMaterialToDB:catch", error);
    }
  };

  const postkeyTopicToDB = async (materialData, dataJson) => {
    dataJson.content.map(async (item, index) => {
      try {
        const newKeyTopicData = {
          materialid: materialData._id,
          name: item.keyTopic,
          summary: item.summary,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newKeyTopicData),
        };

        const keyTopicRes = await fetch(
          `http://192.168.1.100:3000/api/v1/keytopics`,
          requestOptions
        );
        if (!keyTopicRes.ok) {
          const error = keyTopicRes.status;
          throw new Error(
            `postkeyTopicToDB:Network response was not ok ${error}`
          );
        }
        console.log("keyTopicRes");
        const keyTopicData = await keyTopicRes.json();
        console.log(keyTopicData);
        postFlashcardToDB(materialData, keyTopicData, dataJson);
      } catch (error) {
        console.log("postkeyTopicToDB:catch", error);
      }
    });
  };

  const postFlashcardToDB = async (materialData, keyTopicData, dataJson) => {
    console.log("🚀 ~ file: CreateContent.jsx:268 ~ dataJson:", dataJson);
    console.log(
      "🚀 ~ file: CreateContent.jsx:268 ~ keyTopicData:",
      keyTopicData._id
    );
    console.log(
      "🚀 ~ file: CreateContent.jsx:268 ~ materialData:",
      materialData._id
    );
    try {
      const newFlashcardData = {
        // !change the keytopicid and materialid to the actual id from the database
        materialid: "65324950f5f363caadbfe700",
        keytopicid: "65324950f5f363caadbfe704",
        // keyTopicid: keyTopicData._id,
        // materialid: materialData._id,
      };
      console.log("newFlashcardData:");
      console.log(newFlashcardData);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFlashcardData),
      };

      const flashcardRes = await fetch(
        `http://192.168.1.100:3000/api/v1/flashcards`,
        requestOptions
      );
      if (!flashcardRes.ok) {
        const error = flashcardRes.status;
        throw new Error(
          `postFlashcardToDB:Network response was not ok ${error}`
        );
      }
      console.log("flashcardRes");
      const flashcardData = await flashcardRes.json();
      console.log(flashcardData);
      dataJson.content.map(async (item2, index2) => {
        console.log("item2:", item2);

        item2.flashcard.map(async (item3, index3) => {
          console.log("flashcardData", flashcardData);
          try {
            const newDetailsData = {
              // !change the flashcardid and quizid to the actual id from the database
              // flashcardid: flashcardData._id,
              // flashcardid: flashcardData.id,
              // quizid: "000000000000000000000000",
              question: item3.question,
              correctanswer: item3.answer,
            };
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newDetailsData),
            };

            const flashcardRes = await fetch(
              `http://192.168.1.100:3000/api/v1/details`,
              requestOptions
            );
            if (!flashcardRes.ok) {
              const error = flashcardRes.status;
              throw new Error(
                `postFlashcardToDB:Network response was not ok ${error}`
              );
            }
            console.log("newDetailsData");
            const flashcardData = await flashcardRes.json();
            console.log(flashcardData);
          } catch (error) {
            console.log("postDetailsToDB:catch", error);
          }
        });
      });
    } catch (error) {
      console.log("postFlashcardToDB:catch", error);
    }

    // dataJson.content.map(async (item, index) => {

    // }
    // });
  };
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

                    {i.flashcard.map((item, index) => {
                      return (
                        <View key={index}>
                          <Text>{index + 1}</Text>
                          <Text>Question</Text>
                          <Text>{item.question}</Text>
                          <Text>Answer</Text>
                          <Text>{item.answer}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
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
