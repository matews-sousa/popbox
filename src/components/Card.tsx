import { Link } from "react-router-dom";
import { IMovie } from "../types/IMovie";

const Card = ({ movie }: { movie: IMovie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <img
        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        className="rounded-md w-full shadow-2xl"
      />
      <h1 className="mt-3 md:font-semibold text-sm md:text-md">{movie.title}</h1>
    </Link>
  );
};

export default Card;
