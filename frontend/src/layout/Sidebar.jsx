import { NavLink } from "react-router-dom";
import {
  Home,
  Film,
  Tv,
  Heart,
  Sparkles,
  Settings,
  WandSparkles,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Movies",
    icon: Film,
    path: "/movies",
  },
  {
    label: "TV Shows",
    icon: Tv,
    path: "/tv-shows",
  },
  {
    label: "My List",
    icon: Heart,
    path: "/watchlist",
  },
  {
    label: "Recommended",
    icon: WandSparkles,
    path: "/recommended",
  },
  {
    label: "New Releases",
    icon: Sparkles,
    path: "/new-releases",
  },
];

function Sidebar() {
  return (
    <aside
      className="
        fixed left-0 top-0 z-50
        flex h-screen w-[92px]
        flex-col items-center
        border-r border-white/5
        bg-[#080c14]/95
        py-6
        backdrop-blur-xl
      "
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="
          mb-10 flex h-10 w-10
          items-center justify-center
          rounded-xl
          bg-cyan-400
          text-lg font-black
          text-slate-950
          shadow-lg shadow-cyan-500/20
          transition hover:scale-105
        "
      >
        N
      </NavLink>

      {/* Main Navigation */}
      <nav className="flex w-full flex-1 flex-col items-center gap-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            title={label}
            className={({ isActive }) =>
              `
              group relative flex w-full
              flex-col items-center
              gap-1.5 py-3
              text-[10px]
              transition-all duration-200

              ${
                isActive
                  ? "text-cyan-400"
                  : "text-slate-500 hover:text-white"
              }
              `
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="
                      absolute left-0 top-1/2
                      h-8 w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-cyan-400
                      shadow-lg shadow-cyan-400/50
                    "
                  />
                )}

                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span className="hidden xl:block">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <NavLink
        to="/settings"
        title="Settings"
        className={({ isActive }) =>
          `
          relative flex flex-col
          items-center gap-1.5
          py-3 text-[10px]
          transition-colors
          ${
            isActive
              ? "text-cyan-400"
              : "text-slate-500 hover:text-white"
          }
          `
        }
      >
        <Settings size={21} />
        <span className="hidden xl:block">Settings</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;