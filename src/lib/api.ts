import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "924d28dd7bfbf29a25cd9e855174413c",
    language: "en-US",
  },
});

export default api;
