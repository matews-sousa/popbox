import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import Loader from "../components/Loader";
import { ICast } from "../types/ICast";
import Details from "../components/Details";
import { IMedia } from "../types/IMedia";
import DetailsTabs from "../components/DetailsTabs";

type Params = {
  mediaType: "movie" | "tv";
  id: string;
};

const Media = () => {
  const { mediaType, id } = useParams<Params>();
  const { data, isLoading } = useQuery<IMedia>([mediaType, id], async () => {
    const { data } = await api.get(
      `/${mediaType}/${id}?append_to_response=images,videos&include_image_language=en,null`,
    );
    return data;
  });
  const { data: cast, isLoading: castLoading } = useQuery<ICast[]>("cast", async () => {
    const { data } = await api.get(`/${mediaType}/${id}/credits`);
    return data.cast;
  });

  if (isLoading || castLoading) {
    return (
      <div className="mx-auto w-12 pt-96">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data && cast && <Details data={data} cast={cast} />}
      {data?.images.backdrops && data?.images.posters && (
        <DetailsTabs backdrops={data?.images.backdrops} posters={data?.images.posters} />
      )}
    </>
  );
};

export default Media;
