import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const getKeyTopics = async () => {

  let token = await AsyncStorage.getItem("jwt");

  const options = {
    method: 'GET',
    url: `${baseURL}keytopics`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error getting keyTopics', error);
  }
}