import { useEffect, useState } from "react";

const slides = [
  {
    title: "DUNE: PART TWO",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    genre: "Sci-Fi / Action",
    year: "2024",
    duration: "2h 46m",
    poster:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    title: "INTERSTELLAR",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi / Drama",
    year: "2014",
    duration: "2h 49m",
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    title: "AVENGERS: ENDGAME",
    description:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
    genre: "Action / Adventure",
    year: "2019",
    duration: "3h 1m",
    poster:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  },
];

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const movie = slides[activeSlide];

  // Automatic slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="px-4 md:px-6 lg:px-8 pt-5">
      <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[430px] items-center p-6 md:p-10 lg:p-12">

          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center">

            {/* Poster */}
            <div className="hidden shrink-0 md:block">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-[300px] w-[200px] rounded-2xl object-cover shadow-2xl"
              />
            </div>

            {/* Movie Information */}
            <div className="max-w-2xl">

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Featured Movie
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                {movie.description}
              </p>

              {/* Movie details */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span>{movie.genre}</span>
                <span className="text-slate-600">•</span>
                <span>{movie.year}</span>
                <span className="text-slate-600">•</span>
                <span>{movie.duration}</span>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">

                <button
                  className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
                  onClick={() => alert(`Playing trailer: ${movie.title}`)}
                >
                  ▶ Play Trailer
                </button>

                <button
                  className="rounded-full border border-slate-500 bg-slate-900/70 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                  onClick={() => alert(`${movie.title} added to your list`)}
                >
                  ＋ Add to List
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Previous button */}
        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-xl text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-950 md:block"
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-xl text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-950 md:block"
        >
          ›
        </button>

        {/* Slider indicators */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeSlide
                  ? "w-8 bg-cyan-400"
                  : "w-3 bg-slate-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroBanner;