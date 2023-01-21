import axios from "axios";

const Axios = axios.create({
  // baseURL: "https://bet2d.onrender.com/api/v1/",

  baseURL: "http://localhost:3000/api/v1/",
  // baseURL: "http://192.168.100.65:3000/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

export default Axios;
