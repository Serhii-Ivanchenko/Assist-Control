import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://109.87.131.1:7070",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
    //   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosInstance.defaults.headers.common["X-Api-Key"] = `${token}`;
    
};

export const clearAuthHeader = () => {
    //   axiosInstance.defaults.headers.common["Authorization"] = "";
    axiosInstance.defaults.headers.common["X-Api-Key"] = "";
};