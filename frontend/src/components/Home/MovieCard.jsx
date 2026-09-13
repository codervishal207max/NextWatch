import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function MovieCard({ movie }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const match = Math.round(movie.rating * 10);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleSave = (event) => {
    event.stopPropagation();
    setSaved((value) => !value);
  };

  return (
    <article
      className="movie-card"
      tabIndex="0"
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleCardClick();
        }
      }}
      role="button"
    >
      <div className="movie-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />

        <button
          className={saved ? "saved" : ""}
          onClick={handleSave}
          aria-label={`Save ${movie.title}`}
        >
          <Heart
            size={15}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <div className="poster-progress">
          <span style={{ width: `${match}%` }} />
        </div>
      </div>

      <p className="match-score">{match}% Match</p>

      <h3>{movie.title}</h3>

      <small>{movie.genres?.[0]}</small>
    </article>
  );
}

export default MovieCard;