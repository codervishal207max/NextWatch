import { FaHeart, FaStar } from "react-icons/fa";

function MovieCard({ movie }) {
  return (
    <div className="group w-[150px] sm:w-[165px] shrink-0 cursor-pointer">

      {/* Poster */}
      <div className="relative h-[220px] overflow-hidden rounded-xl bg-slate-800">

        <img
          src={
            movie.poster ||
            movie.poster_path ||
            "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Rating */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur">
          <FaStar size={9} />
          {movie.rating ?? movie.vote_average ?? "N/A"}
        </div>

        {/* Watchlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-red-500"
        >
          <FaHeart size={12} />
        </button>

      </div>

      {/* Movie information */}
      <div className="mt-2">

        <h3 className="truncate text-sm font-semibold text-white">
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <span>{movie.year}</span>

          {movie.genres?.length > 0 && (
            <>
              <span>•</span>
              <span className="truncate">
                {movie.genres[0]}
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default MovieCard;