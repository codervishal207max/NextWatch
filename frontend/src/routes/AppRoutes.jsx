import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import MovieDetails from "../pages/MovieDetails/MovieDetails";

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-400">
          This section is coming next.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movie Details */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Sidebar Pages */}
        <Route
          path="/movies"
          element={<PlaceholderPage title="Movies" />}
        />

        <Route
          path="/tv-shows"
          element={<PlaceholderPage title="TV Shows" />}
        />

        <Route
          path="/watchlist"
          element={<PlaceholderPage title="My List" />}
        />

        <Route
          path="/recommended"
          element={<PlaceholderPage title="Recommended" />}
        />

        <Route
          path="/new-releases"
          element={<PlaceholderPage title="New Releases" />}
        />

        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />
      </Route>

      {/* Unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;