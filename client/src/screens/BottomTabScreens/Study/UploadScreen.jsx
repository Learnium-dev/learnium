import { View, Text, TextInput, Button, TextInputBase } from "react-native";
import { useState } from "react";

const UploadScreen = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const inputChange = (text) => {
    // const textObject = { title: text };
    // setPostText(textObject);
    setArticle(text);
  };

  const handleSubmit = () => {
    // console.log(postText);
    const upload = async () => {
      console.log("article", article);
      setIsLoading(true);
      //   console.log("process.env.API_PORT", process.env.API_PORT);
      try {
        const response = await fetch(
          "http://localhost:3000/uploadcontent",
          // `${process.env.API_PORT}/uploadcontent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ article }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // const responseData = await response.json();
        // const responseDataString = await response.text(); // Assuming responseData is a JSON-formatted string
        // console.log("🚀 ~ file: UploadScreen.js:44 ~ responseDataString:", responseDataString)
        // console.log(typeof responseDataString);
        // const responseData = JSON.parse(responseDataString);
        const data = await response.json();
        console.log("data", data);
        console.log(typeof data);
        const dataJson = JSON.parse(data);
        setResponseData(dataJson);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    upload();
  };

  console.log("responseData", responseData);
  //   console.log("responseData.content.summary", responseData?.content);
  //   console.log("responseData.role", responseData?.role);
  console.log(typeof responseData);

  return (
    <View>
      <Text>UploadScreen</Text>
      <TextInput onChangeText={inputChange}></TextInput>
      <Button onPress={handleSubmit} title="Submit"></Button>
      <Text>{isLoading ? "Loading..." : "done"}</Text>
      <Text>summary</Text>
      <Text>{responseData?.summary}</Text>
      <Text style={{ fontWeight: "bold" }}>This is key topic</Text>
      {responseData?.keyTopic.map((item, index) => {
        return (
          <View key={index}>
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
            {/* <Text>This is key topic</Text> */}
          </View>
        );
      })}
      {responseData?.questionAnswer.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item.question}</Text>
            <Text>{item.answer}</Text>
            <Text>{item.choices}</Text>
            <Text>{item.keyTopic}</Text>
          </View>
        );
      })}
      {/* <Text>{responseData?.content.Summary}</Text> */}
      {/* <Text>{responseData?.summary}</Text> */}
    </View>
  );
};

export default UploadScreen;
