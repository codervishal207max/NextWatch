import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaHeart, FaBell, FaUser, FaTimes, FaClock, FaFire } from "react-icons/fa";

const ALL_MOVIES = [
  { title: "Inception", year: "2010", rating: "8.8", genres: ["Sci-Fi", "Thriller"] },
  { title: "Interstellar", year: "2014", rating: "8.7", genres: ["Sci-Fi", "Drama"] },
  { title: "The Dark Knight", year: "2008", rating: "9.0", genres: ["Action", "Crime"] },
  { title: "Parasite", year: "2019", rating: "8.6", genres: ["Drama", "Thriller"] },
  { title: "Oppenheimer", year: "2023", rating: "8.5", genres: ["Drama", "History"] },
  { title: "Dune", year: "2021", rating: "8.0", genres: ["Sci-Fi", "Adventure"] },
  { title: "The Matrix", year: "1999", rating: "8.7", genres: ["Sci-Fi", "Action"] },
  { title: "John Wick", year: "2014", rating: "7.4", genres: ["Action", "Thriller"] },
  { title: "The Hangover", year: "2009", rating: "7.7", genres: ["Comedy"] },
  { title: "Spirited Away", year: "2001", rating: "8.6", genres: ["Animation"] },
  { title: "Get Out", year: "2017", rating: "7.7", genres: ["Horror", "Thriller"] },
  { title: "La La Land", year: "2016", rating: "8.0", genres: ["Romance", "Drama"] },
];

const TRENDING_SEARCHES = ["Interstellar", "Inception", "Dune", "Parasite"];

function Navbar() {
  const { pathname } = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const searchRef = useRef(null);

  const NOTIFICATIONS = [
    { icon: "🎬", text: "Inception is trending today!", time: "2m ago" },
    { icon: "⭐", text: "New top rated: Oppenheimer", time: "1h ago" },
    { icon: "🤖", text: "New recommendation ready for you", time: "3h ago" },
    { icon: "🔥", text: "Dune: Part Two added to catalog", time: "1d ago" },
  ];

  // filtered results
  const results = query.trim().length > 0
    ? ALL_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = focused;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 group shrink-0">
          {/* Play icon in cyan gradient circle */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Text with gradient */}
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Next<span className="text-cyan-400">Watch</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="relative hidden md:block w-full max-w-sm">
          <div className={`flex items-center bg-slate-900 border rounded-lg px-3 py-2 transition-all duration-200
            ${focused ? "border-cyan-500/60 ring-1 ring-cyan-500/20" : "border-slate-700/60 hover:border-slate-600"}`}>
            <FaSearch className={`mr-2.5 shrink-0 transition-colors duration-200 ${focused ? "text-cyan-400" : "text-slate-600"}`} size={13} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Search movies..."
              className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2 text-slate-600 hover:text-slate-300 transition-colors shrink-0">
                <FaTimes size={11} />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-12 left-0 right-0 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden">

              {/* Live Results */}
              {results.length > 0 ? (
                <div>
                  <div className="px-4 pt-3 pb-1 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Results
                  </div>
                  {results.map((movie, i) => (
                    <div
                      key={i}
                      onClick={() => { setQuery(movie.title); setFocused(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-base shrink-0">
                        🎬
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                        <p className="text-slate-500 text-xs">{movie.year} · {movie.genres[0]}</p>
                      </div>
                      <span className="text-yellow-400 text-xs font-semibold shrink-0">★ {movie.rating}</span>
                    </div>
                  ))}
                </div>
              ) : query.trim().length > 0 ? (
                /* No Results */
                <div className="px-4 py-8 text-center">
                  <p className="text-slate-400 text-sm">No results for "<span className="text-white">{query}</span>"</p>
                  <p className="text-slate-600 text-xs mt-1">Try a different keyword</p>
                </div>
              ) : (
                /* Default: Trending */
                <div>
                  <div className="px-4 pt-3 pb-1 text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <FaFire className="text-orange-400" size={10} /> Trending Searches
                  </div>
                  {TRENDING_SEARCHES.map((t, i) => (
                    <div
                      key={i}
                      onClick={() => { setQuery(t); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <FaClock className="text-slate-600 shrink-0" size={12} />
                      <span className="text-slate-300 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Watchlist */}
          <Link
            to="/watchlist"
            title="Watchlist"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${pathname === "/watchlist"
                ? "bg-cyan-400/15 text-cyan-400"
                : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
              }`}
          >
            <FaHeart size={17} />
            <span className="hidden lg:inline">Watchlist</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              title="Notifications"
              onClick={() => setShowNotif((v) => !v)}
              className={`relative flex items-center px-3 py-2 rounded-lg transition-all duration-200
                ${showNotif ? "bg-cyan-400/15 text-cyan-400" : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800"}`}
            >
              <FaBell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotif && (
              <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <span className="text-white font-bold text-sm">Notifications</span>
                  <button onClick={() => setShowNotif(false)} className="text-slate-500 hover:text-white transition-colors">
                    <FaTimes size={13} />
                  </button>
                </div>
                <div className="divide-y divide-slate-800">
                  {NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/60 transition-colors cursor-pointer">
                      <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-sm leading-snug">{n.text}</p>
                        <span className="text-slate-600 text-xs mt-0.5 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-slate-800 text-center">
                  <button className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            title="Profile"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200
              ${pathname === "/profile"
                ? "ring-2 ring-cyan-400"
                : "hover:ring-2 hover:ring-slate-600"
              }`}
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              <FaUser size={13} />
            </div>
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
