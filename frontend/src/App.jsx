import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./routes/AppRoutes";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import Watchlist from "./pages/Watchlist/Watchlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MOVIE_DETAILS()} element={<MovieDetails />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.WATCHLIST} element={<Watchlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;