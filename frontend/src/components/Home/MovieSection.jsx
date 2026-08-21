import MovieCard from "./MovieCard";

function MovieSection({ title = "Movies", movies = [] }) {

  if (!movies.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <button className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors duration-200">
          See all →
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, i) => (
          <MovieCard key={movie.id ?? i} movie={movie} index={i} />
        ))}
      </div>

    </section>
  );
}

export default MovieSection;
