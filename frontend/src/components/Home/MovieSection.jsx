import MovieCard from "./MovieCard";

function MovieSection({ title = "Movies", movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-8 md:px-8">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          {title}
        </h2>

        <button
          className="
            text-sm font-medium
            text-slate-400
            transition
            hover:text-cyan-400
          "
        >
          See all
          <span className="ml-1">→</span>
        </button>

      </div>

      {/* Horizontal Movie Carousel */}
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-4
          scrollbar-hide
          snap-x
          snap-mandatory
        "
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id ?? index}
            className="
              w-[150px]
              shrink-0
              snap-start

              sm:w-[170px]
              md:w-[190px]
              lg:w-[205px]
              xl:w-[220px]
            "
          >
            <MovieCard
              movie={movie}
              index={index}
            />
          </div>
        ))}
      </div>

    </section>
  );
}

export default MovieSection;