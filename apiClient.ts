// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 150000,

//   // You can add additional configuration options here, such as headers or authentication
// });

// export default apiClient;
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 150000,
  };

  const instance = axios.create(defaultOptions);

  //   instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  //     const session = await getSession();
  //     if (session) {
  //       if (config.headers) config.headers.Authorization = `Bearer ${session.jwt}`;
  //     }
  //     return config;
  //   });

  //   instance.interceptors.response.use(
  //     (response: AxiosResponse) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error.response.data.message) {
  //         throw new Error(error.response.data.message);
  //       } else {
  //         throw new Error(error?.response?.data||"error occured");
  //       }
  //     },
  //   );

  return instance;
};

export default apiClient();
