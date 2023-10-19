import { BASE_URL, TOKEN } from "../config/apiConfig";
import axios from "axios";

export const getFlashCards = async (keytopicid) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/flashcards`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    params: {
      keytopicid: keytopicid
    }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error getting flashcards', error);
  }
}

export const getFlashcard = async (id) => {}
export const createFlashcard = async (data) => {}
export const updateFlashcard = async (id, data) => {}
