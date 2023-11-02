import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const askai = async () => {
    let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "POST",
    
    url: `${process.env.EXPO_PUBLIC_HOSTNAME}/askai`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ inputText }),
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error getting keyTopics", error);
  }
}