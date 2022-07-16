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
    <div className="w-full relative h-full">
      <motion.img
        src={`http://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt=""
        className="w-full h-full filter object-cover brightness-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute top-1/4 max-w-3xl mx-auto px-8 md:p-12"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="flex space-x-24 mb-4 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <MdStar className="text-yellow-500" /> <span>{movie?.vote_average}</span>
          </div>
          <div>{movie?.runtime && convertTime(movie?.runtime)}</div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          {movie?.title} ({movie?.release_date.split("-")[0]})
        </h1>
        <p className="text-sm md:text-base mt-5 font-medium">{movie?.overview}</p>
        <div className="flex space-x-4">
          <button className="mt-5 px-4 py-2 rounded-full bg-red-500 font-semibold flex items-center space-x-1 shadow-md shadow-red-600 hover:bg-red-600">
            <MdPlayArrow className="text-2xl" />
            <span>Watch Trailer</span>
          </button>
          <button className="mt-5 px-4 py-2 rounded-full bg-gray-600 font-semibold flex items-center space-x-1 shadow-md shadow-gray-700 hover:bg-gray-700">
            <MdAddCircle className="text-2xl" />
            <span>Add to List</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieInfo;
