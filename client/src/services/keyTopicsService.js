import { BASE_URL, TOKEN } from "../config/apiConfig";
import axios from "axios";

export const getKeyTopics = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/keytopics`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error getting keyTopics', error);
  }
}