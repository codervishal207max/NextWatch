import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import HeroBanner from "../../components/Home/HeroBanner";
import GenreList from "../../components/Home/GenerList";
import MovieSection from "../../components/Home/MovieSection";
import Footer from "../../layout/Footer";

// Temporary frontend movie data
const trendingMovies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genres: ["Sci-Fi", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action"],
    poster:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 8.4,
    genres: ["Action", "Adventure"],
    poster:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 5,
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    genres: ["Sci-Fi", "Action"],
    poster:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    year: 2021,
    rating: 8.2,
    genres: ["Action", "Adventure"],
    poster:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
];

const topRatedMovies = [
  {
    id: 7,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genres: ["Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyHRNYGwFqO.jpg",
  },
  {
    id: 8,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genres: ["Drama", "Crime"],
    poster:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    id: 9,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 10,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    id: 11,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genres: ["Drama", "Thriller"],
    poster:
      "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 12,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genres: ["Drama", "Romance"],
    poster:
      "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
];

const recommendedMovies = [
  {
    id: 13,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.6,
    genres: ["Drama", "History"],
    poster:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    id: 14,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genres: ["Sci-Fi", "Action"],
    poster:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 15,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genres: ["Action", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  },
  {
    id: 16,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genres: ["Sci-Fi", "Drama"],
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 17,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genres: ["Drama", "Thriller"],
    poster:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: 18,
    title: "Joker",
    year: 2019,
    rating: 8.4,
    genres: ["Drama", "Crime"],
    poster:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
];

function Home() {
  const [activeGenre, setActiveGenre] = useState("All");

  const allMovies = [
    ...trendingMovies,
    ...topRatedMovies,
    ...recommendedMovies,
  ];

  const genreMovies =
    activeGenre === "All"
      ? []
      : allMovies.filter((movie) =>
          movie.genres.some(
            (genre) =>
              genre.toLowerCase() === activeGenre.toLowerCase()
          )
        );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroBanner />

      {/* Genre navigation */}
      <GenreList
        active={activeGenre}
        onSelect={setActiveGenre}
      />

      {/* Movie Sections */}
      {activeGenre === "All" ? (
        <>
          <MovieSection
            title="🔥 Trending Now"
            movies={trendingMovies}
          />

          <MovieSection
            title="⭐ Top Rated"
            movies={topRatedMovies}
          />

          <MovieSection
            title="🤖 Recommended For You"
            movies={recommendedMovies}
          />
        </>
      ) : (
        <MovieSection
          title={`Results for "${activeGenre}"`}
          movies={genreMovies}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;