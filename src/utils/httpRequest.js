import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://backend-comerce.onrender.com/api",
});

export default httpRequest;

