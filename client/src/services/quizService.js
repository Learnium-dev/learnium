import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

export const getQuizzes = async (keytopicid,trueFalseString, multipleChoiceString, writtenString) => {
  const token = await AsyncStorage.getItem("jwt");
  console.log( `${baseURL}details?keytopicid=${keytopicid}${trueFalseString}${multipleChoiceString}${writtenString}`)

  try {
    const response = await axios.get(
      `${baseURL}details?keytopicid=${keytopicid}${trueFalseString}${multipleChoiceString}${writtenString}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Quiz loaded", response.data);
    return response.data
    
    // setIsQuizStart(true);
  } catch (err) {
    console.log(err);
  }
};
