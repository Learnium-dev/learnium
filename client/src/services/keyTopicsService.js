import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const getKeyTopics = async () => {
  let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "GET",
    // url: `${baseURL}keytopics`,
    url: `${baseURL}keytopics?email=${tokenEmail}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tokenEmail),
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error getting keyTopics", error);
  }
};
