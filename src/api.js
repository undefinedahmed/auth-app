import axios from "axios";

let axiosInstance = axios.create({
  baseURL: `http://localhost:5050/`,
  // baseURL: `auth-app-backend-production.up.railway.app/`,
});

export default axiosInstance;
