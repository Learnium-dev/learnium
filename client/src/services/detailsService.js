import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

export const updateDetails = async (id, data) => {
  console.log("updating Details with id: " + id)

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
