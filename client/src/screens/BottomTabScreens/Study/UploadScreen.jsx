import {
  View,
  Text,
  TextInput,
  Button,
  TextInputBase,
  ScrollView,
} from "react-native";
import { useState } from "react";
// import mongoose from "mongoose";

const UploadScreen = () => {
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([
    {
      keyTopic: "World War II Overview",
      summary:
        "World War II was a global conflict from 1939-1945 involving the world's major powers in two opposing military alliances: the Allies and the Axis. It employed massive economic, industrial, and scientific resources, blurring the distinction between civilian and military resources. Aircraft played a crucial role in this war.",
      questionAnswer: [
        {
          question: "When did World War II take place?",
          answer: "1939 to 1945",
          choices: [
            "1939 to 1945",
            "1914 to 1918",
            "1935 to 1940",
            "1941 to 1945",
          ],
        },
        {
          question:
            "Which two alliances fought against each other in World War II?",
          answer: "The Allies and the Axis",
          choices: [
            "The Allies and the Axis",
            "The Democrats and the Republicans",
            "The East and the West",
            "The North and the South",
          ],
        },
        {
          question:
            "What was a key technological advancement that played a major role in World War II?",
          answer: "Aircraft",
          choices: ["Tanks", "Submarines", "Aircraft", "Nuclear bombs"],
        },
        {
          question: "Which part of society became involved in World War II?",
          answer: "Both civilian and military resources",
          choices: [
            "Only military resources",
            "Only civilian resources",
            "Both civilian and military resources",
            "None of the above",
          ],
        },
        {
          question:
            "What blurred the distinction between civilian and military resources within this war?",
          answer:
            "The total involvement of economic, industrial and scientific capabilities",
          choices: [
            "The total involvement of economic, industrial and scientific capabilities",
            "The neutrality of countries",
            "The declaration of war",
            "The signing of peace treaties",
          ],
        },
      ],
      flashcard: [
        {
          question: "When did World War II take place?",
          answer: "1939 to 1945",
        },
        {
          question: "Which two alliances fought in World War II?",
          answer: "The Allies and the Axis",
        },
        {
          question:
            "Name a technological development playing a significant role in World War II.",
          answer: "Aircraft",
        },
        {
          question: "Who were involved in World War II?",
          answer: "Both civilian and military resources",
        },
        {
          question:
            "Which factors blurred the distinction between civilian and military resources?",
          answer:
            "The total involvement of economic, industrial and scientific capabilities",
        },
      ],
    },
    {
      keyTopic: "World War II Consequences",
      summary:
        "World War II resulted in an estimated 70 to 85 million fatalities, mostly among civilians due to genocides such as the Holocaust. Additionally, there were deaths from starvation, massacres, and disease. Following the war, Axis defeat led to the occupation of Germany, Austria, and Japan, and war crime trials were held for German and Japanese leaders.",
      questionAnswer: [
        {
          question: "What was the estimated number of World War II fatalities?",
          answer: "70 to 85 million",
          choices: [
            "50 to 60 million",
            "70 to 85 million",
            "85 to 100 million",
            "100 to 120 million",
          ],
        },
        {
          question:
            "Which genocide was part of the fatalities of World War II?",
          answer: "The Holocaust",
          choices: [
            "Armenian genocide",
            "Bosnian genocide",
            "The Holocaust",
            "Rwandan genocide",
          ],
        },
        {
          question: "Which countries were occupied following Axis defeat?",
          answer: "Germany, Austria and Japan",
          choices: [
            "Germany, Austria and Japan",
            "Italy, Germany and Japan",
            "Austria, Germany and France",
            "Germany, France and UK",
          ],
        },
        {
          question:
            "Against whom were war crimes tribunals conducted following World War II?",
          answer: "German and Japanese leaders",
          choices: [
            "German and Japanese leaders",
            "Italian and German leaders",
            "British and American leaders",
            "Soviet and German leaders",
          ],
        },
        {
          question: "What caused the majority of fatalities in World War II?",
          answer: "Genocides, starvation, massacres, and disease",
          choices: [
            "Bombings",
            "Ground combat",
            "Sea warfare",
            "Genocides, starvation, massacres, and disease",
          ],
        },
      ],
      flashcard: [
        {
          question: "What was the estimated number of World War II fatalities?",
          answer: "70 to 85 million",
        },
        {
          question:
            "What was a significant genocide that occurred during World War II?",
          answer: "The Holocaust",
        },
        {
          question: "Which countries were occupied after World War II?",
          answer: "Germany, Austria and Japan",
        },
        {
          question:
            "Against whom were war crimes tribunals conducted after World War II?",
          answer: "German and Japanese leaders",
        },
        {
          question:
            "What were the main sources of fatalities during World War II?",
          answer: "Genocides, starvation, massacres, and disease",
        },
      ],
    },
  ]);
  // const [responseData, setResponseData] = useState([]);

  const inputChange = (text) => {
    // const textObject = { title: text };
    // setPostText(textObject);
    setArticle(text);
  };

  const handleSubmit = () => {
    // console.log(postText);
    const upload = async () => {
      // console.log("article", article);
      setIsLoading(true);
      //   console.log("process.env.API_PORT", process.env.API_PORT);
      try {
        // postToDB();
        const response = await fetch(
          "http://10.128.243.187:3000/uploadcontent",
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

        const data = await response.json();
        // console.log("data", data);
        // console.log(typeof data);
        const dataJson = JSON.parse(data);
        setResponseData(dataJson);
        console.log("Object.keys(responseData)", Object.keys(responseData));
        setIsLoading(false);
        
      } catch (err) {
        console.log(err);
        
      }
    };
    upload();
  };


  
  // const postToDB = async (result) => {
  //   console.log("postToDB");
  //   // create post request to create a new folder in DB
  //   try {
  //     const newFolder = {
  //       name: "test",
  //       // !change this to get userID from global state
  //       userid: '651c6b5cf7a8d6f181bdf41d'   
  //       // userid: new mongoose.Types.ObjectId('651c6b5cf7a8d6f181bdf41d')   
  //     };
  
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json'},
  //       body: JSON.stringify(newFolder), 
  //     };
  //     const folderRes = await fetch(`http://localhost/3000/api/v1/folders`, requestOptions);

  //     // const folderRes = await fetch(`${hostname}/${port}${api}/folders`, requestOptions);
  
  //     if (!folderRes.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     console.log("folderRes.data",folderRes.data);
  //     return folderRes.json();
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log("responseData", responseData);
  //   console.log("responseData.content.summary", responseData?.content);
  //   console.log("responseData.role", responseData?.role);
  // console.log(typeof responseData);


  return (
    <ScrollView>
      <Text>UploadScreen</Text>
      <TextInput onChangeText={inputChange}></TextInput>
      <Button onPress={handleSubmit} title="Submit"></Button>
      <Text>{isLoading ? "Loading..." : "done"}</Text>
      {responseData?.map((item, index) => {
        return (
          <View key={index}>

            <Text style={{ fontWeight: "bold" }}>{item.keyTopic}</Text>
            <Text style={{ fontWeight: "normal" }}>{item.summary}</Text>
            {console.log(responseData?.questionAnswer)}
            {item.questionAnswer.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{index + 1}</Text>
                  <Text>{item.question}</Text>
                  <Text>{item.answer}</Text>
                  <Text>{item.choices}</Text>
                </View>
              );
            })}
            {item.flashcard.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{index + 1}</Text>
                  <Text>{item.question}</Text>
                  <Text>{item.answer}</Text>
                </View>
              );
            })}

          </View>
        );
      })}
      {/* <Text>summary</Text>
      <Text>{responseData?.summary}</Text>
      <Text style={{ fontWeight: "bold" }}>This is key topic</Text> */}
      {/* {responseData?.keyTopic.map((item, index) => {
        return (
          <View key={index}>
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
            
          </View>
        ); 
      })} */}
      {/* {responseData?.questionAnswer.map((item, index) => {
         return (
           <View key={index}>
             <Text>{item.question}</Text>
             <Text>{item.answer}</Text>
             <Text>{item.choices}</Text>
             <Text>{item.keyTopic}</Text>
           </View>
         );
       })} */}
    </ScrollView>
  );
};

export default UploadScreen;
