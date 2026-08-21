import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Auto attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("nw_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout on 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("nw_auth");
      localStorage.removeItem("nw_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const movieAPI = {
  getTrending:       () => API.get("/api/movies/trending"),
  getTopRated:       () => API.get("/api/movies/top-rated"),
  getByGenre:        (genre) => API.get(`/api/movies/?genre=${genre}`),
  getById:           (id) => API.get(`/api/movies/${id}`),
  search:            (q) => API.get(`/api/movies/search?q=${q}`),
};

export const recommendAPI = {
  getRecommendations: () => API.get("/api/recommendations/"),
  mlPredict:          (movieId) => API.post(`/api/recommendations/ml-predict?movie_id=${movieId}`),
};

export const watchlistAPI = {
  get:    ()        => API.get("/api/watchlist/"),
  add:    (movieId) => API.post(`/api/watchlist/${movieId}`),
  remove: (movieId) => API.delete(`/api/watchlist/${movieId}`),
};

export const userAPI = {
  getMe: () => API.get("/api/users/me"),
};

export default API;
