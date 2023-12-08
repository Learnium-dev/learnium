import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const getFolders = async () => {
  let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "GET",
    url: `${baseURL}folders?email=${tokenEmail}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error getting folders", error);
  }
};

export const getFolder = async (id) => {
  let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "GET",
    url: `${baseURL}folders/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error getting folder", error);
  }
};
