import { Link } from "react-router-dom";
import { IMovie } from "../types/IMovie";

const Card = ({ movie }: { movie: IMovie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <img
        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        className="rounded-md w-full shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200"
      />
      <h1 className="mt-3 md:font-semibold text-sm md:text-md">{movie.title}</h1>
    </Link>
  );
};

export default Card;
