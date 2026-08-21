import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Sidebar - fixed left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-20">
        <Navbar />

        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;