import { useState, useEffect } from "react";

const SLIDES = [
  {
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi · Drama",
    duration: "2h 49m",
    rating: "8.7",
    desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    tag: "⭐ Top Recommended",
    bg: "from-slate-950 via-indigo-950 to-slate-950",
    glow1: "bg-cyan-500/10",
    glow2: "bg-indigo-500/10",
  },
  {
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi · Thriller",
    duration: "2h 28m",
    rating: "8.8",
    desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    tag: "🔥 Trending Now",
    bg: "from-slate-950 via-purple-950 to-slate-950",
    glow1: "bg-purple-500/10",
    glow2: "bg-blue-500/10",
  },
  {
    title: "The Dark Knight",
    year: "2008",
    genre: "Action · Crime",
    duration: "2h 32m",
    rating: "9.0",
    desc: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests.",
    tag: "🏆 All Time Best",
    bg: "from-slate-950 via-zinc-900 to-slate-950",
    glow1: "bg-yellow-500/10",
    glow2: "bg-orange-500/10",
  },
  {
    title: "Dune",
    year: "2021",
    genre: "Sci-Fi · Adventure",
    duration: "2h 35m",
    rating: "8.0",
    desc: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions.",
    tag: "🌟 Epic Adventure",
    bg: "from-slate-950 via-amber-950 to-slate-950",
    glow1: "bg-amber-500/10",
    glow2: "bg-orange-500/10",
  },
  {
    title: "Oppenheimer",
    year: "2023",
    genre: "Drama · History",
    duration: "3h 0m",
    rating: "8.5",
    desc: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    tag: "🎬 Award Winner",
    bg: "from-slate-950 via-red-950 to-slate-950",
    glow1: "bg-red-500/10",
    glow2: "bg-rose-500/10",
  },
];

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  function goTo(index) {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }

  const slide = SLIDES[current];

  return (
    <section className={`relative w-full min-h-[560px] bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden transition-all duration-700`}>

      {/* Glow blobs */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${slide.glow1} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />
      <div className={`absolute bottom-0 right-1/4 w-80 h-80 ${slide.glow2} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />

      {/* Slide Content */}
      <div
        className={`relative z-10 w-full px-6 py-16 flex flex-col items-center text-center transition-all duration-300 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          {slide.tag}
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-black text-white leading-tight max-w-3xl">
          {slide.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center justify-center gap-3 mt-4 text-slate-400 text-sm flex-wrap">
          <span>{slide.year}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>{slide.genre}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>{slide.duration}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="text-yellow-400 font-semibold">★ {slide.rating}</span>
        </div>

        {/* Description */}
        <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-2xl">
          {slide.desc}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-7 py-3 rounded-lg text-sm transition-all duration-200 hover:scale-105">
            ▶ Watch Now
          </button>
          <button className="border border-slate-600 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-7 py-3 rounded-lg text-sm transition-all duration-200">
            + Watchlist
          </button>
        </div>

      </div>

      {/* Dots — centered at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-cyan-400"
                : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Arrows — vertically centered */}
      <button
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-800/70 border border-slate-700 text-white hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center text-2xl font-light"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % SLIDES.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-800/70 border border-slate-700 text-white hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center text-2xl font-light"
      >
        ›
      </button>

    </section>
  );
}

export default HeroBanner;
