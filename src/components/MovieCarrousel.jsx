import { Link } from "react-router-dom";
import { TMDB_IMAGES } from "../utils/contants";

const MovieCarrousel = ({ movie, size }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="flex-none w-48 md:w-64 cursor-pointer transform transition-transform hover:scale-105">
        <img
          src={TMDB_IMAGES + size + movie.backdrop_path}
          alt={movie.title}
          className="w-full h-28 md:h-36 object-cover rounded"
        />
        <h3 className="text-white text-sm mt-2 font-medium">{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCarrousel;
