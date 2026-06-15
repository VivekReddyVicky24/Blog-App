import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

// Search articles by query
export const searchArticles = (query) => {
  return API.get("/articles/search/query", {
    params: { q: query }
  });
};

export default API;