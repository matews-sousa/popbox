import { IMovie } from "../types/IMovie";
import { MdAddCircle, MdPlayArrow, MdStar } from "react-icons/md";
import { motion } from "framer-motion";

interface Props {
  movie?: IMovie;
}

const MovieInfo = ({ movie }: Props) => {
  // convert minutes to hours and minutes
  const convertTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  };

  return (
    <div className="w-full relative h-full rounded-lg overflow-hidden shadow-xl">
      <motion.img
        src={`http://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt=""
        className="w-full h-full filter object-cover brightness-50 hover:scale-110 transition-transform duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-3 max-w-md px-4"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h1 className="text-lg md:text-2xl font-bold">{movie?.title}</h1>
        <p className="text-sm md:text-md mt-5 font-medium">
          {movie && movie?.overview.length > 150
            ? movie?.overview.slice(0, 150) + "..."
            : movie?.overview}
        </p>
      </motion.div>
    </div>
  );
};

export default MovieInfo;
