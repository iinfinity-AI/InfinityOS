import axiosInstance from "./axiosInstance";

const authService = {
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
  signup: (data) => axiosInstance.post("/auth/signup", data),
};

export default authService;
