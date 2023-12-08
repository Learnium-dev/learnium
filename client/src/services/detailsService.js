import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateDetails = async (id, data) => {
  const token = await AsyncStorage.getItem("jwt");

  const options = {
    method: 'PUT',
    url: `${baseURL}details/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: data
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error updating details', error);
  }
}
