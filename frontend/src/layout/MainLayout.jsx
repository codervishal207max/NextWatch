import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="px-5 pb-10">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;