import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";

const slides = [
  { title: "DUNE: ", accent: "PART TWO", description: "The saga continues as Paul Atreides unites with the Fremen, with his conviction to bring an end to the galaxy's war.", details: "Sci-Fi / Action  |  2024  |  PG-13  |  2h 46m", poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", backdrop: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg" },
  { title: "INTER", accent: "STELLAR", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", details: "Sci-Fi / Drama  |  2014  |  PG-13  |  2h 49m", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
  { title: "AVENGERS: ", accent: "ENDGAME", description: "The Avengers assemble once more to reverse the damage caused by Thanos.", details: "Action / Adventure  |  2019  |  PG-13  |  3h 1m", poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" },
];

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [inList, setInList] = useState(false);
  const movie = slides[activeSlide];
  useEffect(() => { const timer = setInterval(() => setActiveSlide((slide) => (slide + 1) % slides.length), 6500); return () => clearInterval(timer); }, []);
  const changeSlide = (direction) => setActiveSlide((slide) => (slide + direction + slides.length) % slides.length);
  return <section className="featured-section"><div className="featured-card">
    <div className="featured-art" style={{ backgroundImage: `url(${movie.backdrop})` }} />
    <div className="featured-copy"><img src={movie.poster} alt={`${movie.title}${movie.accent} poster`} className="featured-poster" /><div className="featured-description"><h1>{movie.title}<em>{movie.accent}</em></h1><p>{movie.description}</p><small>{movie.details}</small><div className="featured-buttons"><button className="play-button" onClick={() => window.alert(`Playing trailer: ${movie.title}${movie.accent}`)}><Play size={16} fill="currentColor" /> Play Trailer</button><button className={`list-button ${inList ? "saved" : ""}`} onClick={() => setInList((saved) => !saved)}><Plus size={17} /> {inList ? "In My List" : "Add to List"}</button></div></div></div>
    <button className="hero-arrow left" onClick={() => changeSlide(-1)} aria-label="Previous featured movie"><ChevronLeft /></button><button className="hero-arrow right" onClick={() => changeSlide(1)} aria-label="Next featured movie"><ChevronRight /></button><div className="hero-dots">{slides.map((_, index) => <button key={index} className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}`} />)}</div>
  </div></section>;
}
export default HeroBanner;
