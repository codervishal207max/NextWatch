import HeroBanner from "../../components/Home/HeroBanner";
import MovieSection from "../../components/Home/MovieSection";
import Footer from "../../layout/Footer";

const catalog = [
  ["Oppenheimer", 2023, 8.8, "Drama", "8Gxv8gSFCU0XGDykEGv7zR1n2ua"],
  ["The Killer", 2023, 8.1, "Thriller", "e7Jvsry47JJQruuezjU2X1Z6J77"],
  ["Spider-Man: Across the Spider-Verse", 2023, 9.1, "Animation", "8Vt6mWEReuy4Of61Lnj5Xj704m8"],
  ["Killers of the Flower Moon", 2023, 8.5, "Drama", "dB6Krk806zeqd0YNp2ngQ9zXteH"],
  ["Past Lives", 2023, 9.8, "Romance", "k3waqVXSnvCZWfJYNtdamTgTtTA"],
  ["Poor Things", 2023, 9.5, "Drama", "kCGlIMHnOm8JPXq3rXM6c5wMxcT"],
  ["Blade Runner 2049", 2017, 9.2, "Sci-Fi", "gajva2L0rPYkEWjzgFlBXCAVBE5"],
  ["Anatomy of a Fall", 2023, 8.9, "Drama", "kQs6keheMwCxJxrzV83VUwFtHkB"],
  ["Furiosa", 2024, 9.0, "Action", "iADOJ8Zymht2JPMoy3R7xceZprc"],
  ["Barbie", 2023, 8.7, "Comedy", "iuFNMS8U5cb6xfzi51Dbkovj7vM"],
  ["The Holdovers", 2023, 9.3, "Comedy", "VHSzNBTwxV8vh7wylo7O9CLdac"],
  ["Saltburn", 2023, 8.6, "Drama", "qjhahNLSZ705Bcy1mq0eopJlqD9"],
].map(([title, year, rating, genre, image], index) => ({ id: index + 1, title, year, rating, genres: [genre], poster: `https://image.tmdb.org/t/p/w500/${image}.jpg` }));

function Home() {
  return <div className="dashboard-page">
    <HeroBanner />
    <div className="movie-shelves">
      <MovieSection title="Continue Watching for Alex" movies={catalog.slice(0, 6)} />
      <MovieSection title="Recommended for You" movies={catalog.slice(4, 10)} />
      <MovieSection title="Recently Added" movies={catalog.slice(5, 11)} />
      <MovieSection title="Trending Movies" movies={catalog.slice(8)} />
    </div>
    <Footer />
  </div>;
}

export default Home;
