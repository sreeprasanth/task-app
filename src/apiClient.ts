import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5001",
  // Additional configuration options...
});

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 150000,

//   // You can add additional configuration options here, such as headers or authentication
// });

export default apiClient;
