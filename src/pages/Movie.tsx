import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import { MdAddCircle, MdPlayArrow, MdStar } from "react-icons/md";

const Movie = () => {
  const { id } = useParams();
  const { data, status } = useQuery<IMovie>(
    "movie",
    async () => {
      const { data } = await api.get(`/${id}`);
      return data;
    },
    { keepPreviousData: false },
  );

  // convert minutes to hours and minutes
  const convertTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <Container>
      <div className="absolute top-0 left-0 w-screen h-4/5">
        <div className="w-full relative h-full">
          <img
            src={`http://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt=""
            className="w-full h-full filter object-cover brightness-50"
          />
          <div className="absolute top-1/4 max-w-3xl pl-12 pr-2">
            <div className="flex space-x-24 mb-4 font-medium text-sm md:text-xl">
              <div className="flex items-center space-x-2">
                <MdStar className="text-yellow-500" /> <span>{data?.vote_average}</span>
              </div>
              <div>{data?.release_date.split("-")[0]}</div>
              <div>{data && convertTime(data?.runtime)}</div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{data?.title}</h1>
            <p className="text-sm md:text-base mt-5 font-medium">{data?.overview}</p>
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Movie;
