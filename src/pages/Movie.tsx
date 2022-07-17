import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import Loader from "../components/Loader";
import { BsPlay, BsSuitHeart } from "react-icons/bs";
import { ICast } from "../types/ICast";

const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<IMovie>("movie", async () => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  });
  const { data: cast, isLoading: castLoading } = useQuery<ICast[]>("cast", async () => {
    const { data } = await api.get(`/movie/${id}/credits`);
    return data.cast;
  });

  if (isLoading || castLoading) {
    return (
      <Container>
        <div className="mx-auto w-12 pt-96">
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="absolute w-screen h-3/5 top-0 left-0">
        <div className="relative z-10 w-full h-full">
          <img
            src={`http://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-gradient-to-t from-gray-900 h-44 w-full absolute bottom-0 z-10"></div>
      </div>
      <section className="mt-[300px] relative z-30 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="">
          <div className="w-60">
            <img
              src={`http://image.tmdb.org/t/p/original/${data?.poster_path}`}
              className="rounded-lg w-full"
            />
          </div>
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
        </div>
        <div className="col-span-2 mt-10">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <p className="my-3 text-gray-300">Original title: {data?.original_title}</p>

          <div className="flex space-x-4 mt-6">
            <button className="px-5 py-3 rounded-full bg-red-500 hover:bg-red-600 hover:shadow-red-600 shadow-md shadow-red-500 flex items-center space-x-2 font-semibold">
              <span>Watch Trailer</span>
              <BsPlay className="h-6 w-6" />
            </button>
            <button className=" rounded-full border-2 border-white p-3">
              <BsSuitHeart className="h-6 w-6" />
            </button>
          </div>

          <p className="mt-10 text-lg text-gray-300">{data?.overview}</p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Details</h3>
            <ul className="mt-2 w-full">
              <li className="grid grid-cols-5">
                <span className="text-gray-300 font-medium">Genres</span>
                <span className="text-gray-500 col-span-4">
                  {data?.genres?.map((genre) => genre.name).join(", ")}
                </span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-5">
                <span className="text-gray-300 font-medium">Release date</span>
                <span className="text-gray-500 col-span-4">{data?.release_date}</span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-5">
                <span className="text-gray-300 font-medium">Runtime</span>
                <span className="text-gray-500 col-span-4">{data?.runtime} min</span>
              </li>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
              <li className="grid grid-cols-5">
                <span className="text-gray-300 font-medium">Language</span>
                <span className="text-gray-500 col-span-4">{data?.original_language}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Cast</h2>
          <div>
            <ul className="space-y-4">
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
        </div>
      </section>
    </Container>
  );
};

export default Movie;
