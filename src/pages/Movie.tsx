import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import MovieInfo from "../components/MovieInfo";
import Loader from "../components/Loader";

const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<IMovie>("movie", async () => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  });

  if (isLoading) {
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
      <div className="absolute top-0 left-0 w-screen h-4/5">
        <MovieInfo movie={data} />
      </div>
    </Container>
  );
};

export default Movie;
