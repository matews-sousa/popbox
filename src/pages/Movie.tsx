import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import Loader from "../components/Loader";
import { ICast } from "../types/ICast";
import Details from "../components/Details";

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

  return <Container>{data && cast && <Details data={data} cast={cast} />}</Container>;
};

export default Movie;
