import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import HeroBanner from "../../components/Home/HeroBanner";
import GenreList from "../../components/Home/GenerList";
import MovieSection from "../../components/Home/MovieSection";
import Footer from "../../layout/Footer";
import { movieAPI, recommendAPI } from "../../services/api";

function normaliseMovies(movies) {
  return movies.map((movie) => ({
    ...movie,
    genres: Array.isArray(movie.genres)
      ? movie.genres
      : (movie.genres ?? "").split(",").filter(Boolean),
  }));
}

function Home() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    async function fetchAll() {
      try {
        const [trendingResult, topRatedResult, recommendedResult] = await Promise.allSettled([
          movieAPI.getTrending(),
          movieAPI.getTopRated(),
          recommendAPI.getRecommendations(),
        ]);
        if (trendingResult.status === "fulfilled") {
          setTrending(normaliseMovies(trendingResult.value.data));
        }
        if (topRatedResult.status === "fulfilled") {
          setTopRated(normaliseMovies(topRatedResult.value.data));
        }
        if (recommendedResult.status === "fulfilled") {
          setRecommended(normaliseMovies(recommendedResult.value.data));
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // Fetch by genre when genre changes
  useEffect(() => {
    if (activeGenre === "All") return;
    async function fetchByGenre() {
      try {
        const res = await movieAPI.getByGenre(activeGenre);
        setGenreMovies(normaliseMovies(res.data));
      } catch (err) {
        console.error("Failed to fetch by genre:", err);
      }
    }
    fetchByGenre();
  }, [activeGenre]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroBanner />
      <GenreList active={activeGenre} onSelect={setActiveGenre} />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-slate-500 text-sm">Loading movies...</p>
          </div>
        </div>
      ) : activeGenre === "All" ? (
        <>
          <MovieSection title="🔥 Trending Now"          movies={trending} />
          <MovieSection title="⭐ Top Rated"              movies={topRated} />
          <MovieSection title="🤖 Recommended For You"   movies={recommended} />
        </>
      ) : (
        <MovieSection title={`Results for "${activeGenre}"`} movies={genreMovies} />
      )}

      <Footer />
    </div>
  );
}

export default Home;
