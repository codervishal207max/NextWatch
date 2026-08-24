import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Application Layout */}
        <Route element={<MainLayout />}>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Temporary pages */}
          <Route
            path="/movies"
            element={
              <div className="text-white text-2xl font-bold">
                Movies Page
              </div>
            }
          />

          <Route
            path="/tv-shows"
            element={
              <div className="text-white text-2xl font-bold">
                TV Shows Page
              </div>
            }
          />

          <Route
            path="/watchlist"
            element={
              <div className="text-white text-2xl font-bold">
                My List Page
              </div>
            }
          />

          <Route
            path="/recommended"
            element={
              <div className="text-white text-2xl font-bold">
                Recommended Page
              </div>
            }
          />

          <Route
            path="/new-releases"
            element={
              <div className="text-white text-2xl font-bold">
                New Releases Page
              </div>
            }
          />

          <Route
            path="/settings"
            element={
              <div className="text-white text-2xl font-bold">
                Settings Page
              </div>
            }
          />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;