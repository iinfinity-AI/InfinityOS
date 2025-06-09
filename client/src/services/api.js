import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === "TOKEN_EXPIRED"
    ) {
      console.log("Session expired, logging out...");


      localStorage.clear();

 
      window.location.href = "/";

      alert("Your session has expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default API;
