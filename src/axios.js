import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-2241f.cloudfunctions.net/api"
  // baseURL: "http://localhost:5001/clone-2241f/us-central1/api", // THE API (cloud function) URL
});

export default instance;
