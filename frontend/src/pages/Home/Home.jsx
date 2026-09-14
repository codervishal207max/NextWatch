import { useEffect, useState } from "react";

import HeroBanner from "../../components/Home/HeroBanner";
import MovieSection from "../../components/Home/MovieSection";
import Footer from "../../layout/Footer";
import { movieAPI } from "../../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await movieAPI.getAll();

        const movieData = response.data || [];

        const formattedMovies = movieData.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          rating: movie.rating,
          genres: movie.genres
            ? movie.genres.split(",").map((genre) => genre.trim())
            : [],
          poster: movie.poster_path
            ? movie.poster_path.startsWith("http")
              ? movie.poster_path
              : `https://image.tmdb.org/t/p/w500${
                movie.poster_path.startWith("/")
                 ? movie.poster_path
                 : `/${movie.poster_path}`
                }`
            : null,
        }));

        setMovies(formattedMovies);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <HeroBanner />

        <div className="movie-shelves">
          <p className="px-5 py-10 text-gray-400">
            Loading movies...
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <HeroBanner />

        <div className="movie-shelves">
          <p className="px-5 py-10 text-red-400">
            {error}
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <HeroBanner />

      <div className="movie-shelves">
        <MovieSection
          title="Continue Watching for Alex"
          movies={movies.slice(0, 6)}
        />

        <MovieSection
          title="Recommended for You"
          movies={movies.slice(4, 10)}
        />

        <MovieSection
          title="Recently Added"
          movies={movies.slice(5, 11)}
        />

        <MovieSection
          title="Trending Movies"
          movies={movies.slice(8)}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;