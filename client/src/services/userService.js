import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const getFirstName = async () => {
  let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "GET",
    // url: `${baseURL}users`,
    url: `${baseURL}users?email=${tokenEmail}`, 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data[0].firstname; 
  } catch (error) {
    console.error("Error getting user's first name", error);
  }
};

export const getLastName = async () => {
  let token = await AsyncStorage.getItem("jwt");
  let tokenEmail = await AsyncStorage.getItem("email");

  const options = {
    method: "GET",
    // url: `${baseURL}users`,
    url: `${baseURL}users?email=${tokenEmail}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data[0].lastname;
  } catch (error) {
    console.error("Error getting user's last name", error);
  }
};



