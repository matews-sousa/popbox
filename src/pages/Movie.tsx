import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import Loader from "../components/Loader";
import { ICast } from "../types/ICast";
import Details from "../components/Details";
import { IMedia } from "../types/IMedia";
import ImagesList from "../components/ImagesList";
import DetailsTabs from "../components/DetailsTabs";

const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<IMedia>("movie", async () => {
    const { data } = await api.get(
      `/movie/${id}?append_to_response=images,videos&include_image_language=en,null`,
    );
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
      {data && cast && <Details data={data} cast={cast} />}
      {data?.images.backdrops && data?.images.posters && (
        <DetailsTabs backdrops={data?.images.backdrops} posters={data?.images.posters} />
      )}
    </Container>
  );
};

export default Movie;
