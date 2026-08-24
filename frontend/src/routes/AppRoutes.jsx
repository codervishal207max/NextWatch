export const ROUTES = {
  HOME: "/",
  MOVIE_DETAILS: (id = ":id") => `/movie/${id}`,
  PROFILE: "/profile",
  REGISTER: "/register",
  SEARCH: "/search",
  WATCHLIST: "/watchlist",
};

export default ROUTES;