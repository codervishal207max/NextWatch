import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="ml-[100px] min-h-screen">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="px-5 pb-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default MainLayout;