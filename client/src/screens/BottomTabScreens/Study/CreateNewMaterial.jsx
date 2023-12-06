import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateNewMaterial = () => {
  const { navigate } = useNavigation();

  const handleUploadPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();

      const formData = new FormData();
      formData.append("pdf", {
        uri: res.assets[0].uri,
        name: res.assets[0].name,
        type: res.assets[0].mimeType,
      });

      const response = await axios.post(
        "http://10.128.243.187:3000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>CreateNewMaterial</Text>

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

export default CreateNewMaterial;
