import { BASE_URL, TOKEN } from "../config/apiConfig";
import axios from "axios";

export const updateDetails = async (id, data) => {
  console.log("updating Details with id: " + id)

  const options = {
    method: 'PUT',
    url: `${BASE_URL}/details/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
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
