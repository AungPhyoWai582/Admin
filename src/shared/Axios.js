import axios from "axios";

const Axios = axios.create({
  baseURL: "https://bet2d.herokuapp.com/api/v1/",

  // baseURL: "http://localhost:3000/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

export default Axios;
