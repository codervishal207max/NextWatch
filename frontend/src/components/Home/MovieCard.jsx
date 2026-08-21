import { FaHeart, FaStar } from "react-icons/fa";

const GRADIENTS = [
  "from-violet-900 to-indigo-900",
  "from-slate-800 to-slate-900",
  "from-emerald-900 to-teal-900",
  "from-red-900 to-rose-900",
  "from-blue-900 to-cyan-900",
  "from-amber-900 to-orange-900",
];

function MovieCard({ movie, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 cursor-pointer">

      {/* Thumbnail */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {/* Placeholder icon */}
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white/10" stroke="currentColor" strokeWidth="1">
          <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
        </svg>

        {/* Rating badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-md">
          <FaStar size={9} />
          {movie.rating}
        </div>

        {/* Watchlist button */}
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-black/90">
          <FaHeart size={12} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate leading-snug">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-slate-500 text-xs">{movie.year}</span>
          <div className="flex gap-1 flex-wrap justify-end">
            {movie.genres.slice(0, 1).map((g) => (
              <span key={g} className="bg-slate-800 text-slate-500 text-xs px-1.5 py-0.5 rounded">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MovieCard;
