import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://4857-188-163-32-77.ngrok-free.app",

  // baseURL: "https://app.assist.cam",
  // withCredentials: true,
});

export const setAuthHeader = (api_key) => {
  axiosInstance.defaults.headers.common["X-Api-Key"] = `${api_key}`;
};

export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common["X-Api-Key"] = "";
};
