import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_API_URL_BACKEND || "https://backend-comerce.onrender.com/api",
});

export default httpRequest;

