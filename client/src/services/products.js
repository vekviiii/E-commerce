import axios from "axios";
import API from "./auth";

const API_URL = "http://localhost:5000/api";

export const fetchProducts = async () => {
  try {
    const response = await API.get(`/products`);

    return response.data;
  } catch (error) {
    console.error(`error fetching data: ${error.message}`);
    throw error;
  }
};
