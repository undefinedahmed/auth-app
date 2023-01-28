import axios from "axios";

let axiosInstance = axios.create({
  baseURL: `http://localhost:5050/`,
});

export default axiosInstance;
