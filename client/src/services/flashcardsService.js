import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

export const getFlashCards = async (keytopicid) => {
  const token = await AsyncStorage.getItem("jwt");

  const options = {
    method: "GET",
    url: `${baseURL}flashcards`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      keytopicid: keytopicid,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error getting flashcards", error);
  }
};

export const getMaterialFlashCards = async (folderid) => {
  const token = await AsyncStorage.getItem("jwt");

  const options = {
    method: "GET",
    url: `${baseURL}flashcards`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      folderid: folderid,
    },
  };

  try {
    const response = await axios(options);
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    console.error("Error getting flashcards", error);
  }
};

export const getFlashcard = async (id) => {};
export const createFlashcard = async (data) => {};
export const updateFlashcard = async (id, data) => {};
