import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://app.assist.cam",
  withCredentials: true,
});

export const setAuthHeader = (api_key) => {
    //   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosInstance.defaults.headers.common["X-Api-Key"] = `${api_key}`;
    
};

export const clearAuthHeader = () => {
    //   axiosInstance.defaults.headers.common["Authorization"] = "";
    axiosInstance.defaults.headers.common["X-Api-Key"] = "";
};