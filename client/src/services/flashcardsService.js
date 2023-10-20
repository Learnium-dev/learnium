import { BASE_URL, TOKEN } from "../config/apiConfig";
import axios from "axios";

export const getFlashCards = async (keytopicid) => {
  const options = {
    method: "GET",
    url: `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/flashcards`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMwOTJiMGRlYjJlYjZlNjg1NzM3YzkiLCJpYXQiOjE2OTc3ODEyMDEsImV4cCI6MTY5Nzg2NzYwMX0.bZ7hELDvOJWe8zZHXbnKJqE4uGqsyFeqmkUUDWI_ciI`,
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

export const getFlashcard = async (id) => {};
export const createFlashcard = async (data) => {};
export const updateFlashcard = async (id, data) => {};
