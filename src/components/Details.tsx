import { ICast } from "../types/ICast";
import { BsPlay, BsSuitHeart } from "react-icons/bs";
import { motion } from "framer-motion";
import { IMedia } from "../types/IMedia";

interface Props {
  data: IMedia;
  cast: ICast[];
}

const Details = ({ data, cast }: Props) => {
  // convert minutes to hours and minutes
  const convertMinutes = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  };

  return (
    <>
      <div className="absolute w-full h-3/5 top-0 left-0">
        <motion.img
          src={`http://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
          className="absolute z-10 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <div className="bg-gradient-to-t from-gray-900 h-full w-full absolute bottom-0 z-10"></div>
      </div>
      <motion.section
        className="pt-[300px] relative z-30 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-6 place-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="col-span-1 w-56 md:w-full mx-auto"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={`http://image.tmdb.org/t/p/original/${data?.poster_path}`}
            className="rounded-lg"
          />

          <div className="mt-4 flex items-center space-x-4">
            <div
              className="radial-progress text-lg text-red-600 font-semibold"
              style={{ "--value": data?.vote_average * 10, "--size": "50px" }}
            >
              {data?.vote_average}
            </div>
            <p className="text-lg">
              <span className="font-semibold">{data?.vote_count}</span>{" "}
              <span className="text-gray-400">votes</span>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="col-span-1 md:col-span-2 mt-10"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold">{data?.title || data?.name}</h1>
          <p className="my-3 text-gray-300">
            Original title: {data?.original_title || data?.original_name}
          </p>

          <div className="flex space-x-4 mt-6">
            <button className="px-4 md:px-5 py-2 md:py-3 rounded-full bg-red-500 hover:bg-red-600 hover:shadow-red-600 shadow-md shadow-red-500 flex items-center space-x-2 font-semibold">
              <span>Watch Trailer</span>
              <BsPlay className="h-6 w-6" />
            </button>
            <button className="rounded-full border-2 border-white p-2 md:p-3">
              <BsSuitHeart className="h-6 w-6" />
            </button>
          </div>

          <p className="mt-10 md:text-lg text-gray-300">{data?.overview}</p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Details</h3>
            <ul className="mt-4 w-full">
              <li className="grid grid-cols-3">
                <span className="text-gray-300 font-medium">Genres</span>
                <span className="text-gray-500 col-span-2">
                  {data?.genres?.map((genre) => genre.name).join(", ")}
                </span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-3">
                <span className="text-gray-300 font-medium">
                  {data?.runtime ? "Runtime" : "N° of EPs"}
                </span>
                <span className="text-gray-500 col-span-2">
                  {convertMinutes(data?.runtime) || data?.number_of_episodes}
                </span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-3">
                <span className="text-gray-300 font-medium">Release date</span>
                <span className="text-gray-500 col-span-2">
                  {new Date(data?.release_date || data?.first_air_date).toLocaleDateString()}
                </span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-3">
                <span className="text-gray-300 font-medium">Language</span>
                <span className="text-gray-500 col-span-2">
                  {data?.original_language.toUpperCase()}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
        <motion.div
          className="mt-10 col-span-1 md:col-span-3 lg:col-span-1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold mb-6">Cast</h2>
          <div>
            <ul className="space-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
              {cast?.slice(0, 4).map((cast) => (
                <li key={cast.id} className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={`http://image.tmdb.org/t/p/original/${cast.profile_path}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{cast.name}</h4>
                    <p className="text-sm text-gray-400">as {cast.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Details;
