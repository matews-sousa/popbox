import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ICast } from "../types/ICast";
import { IMedia } from "../types/IMedia";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../components/Loader";
import Details from "../components/Details";
import Card from "../components/Card";
import DetailsTabs from "../components/DetailsTabs";
import api from "../lib/api";

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
  const { data: cast, isLoading: castIsLoading } = useQuery<ICast[]>("cast", async () => {
    const { data } = await api.get(`/${mediaType}/${id}/credits`);
    return data.cast;
  });
  const { data: recommendations, isLoading: recommendationsIsLoading } = useQuery<IMedia[]>(
    ["recommendations", mediaType],
    async () => {
      const { data } = await api.get(`/${mediaType}/${id}/similar`);
      return data.results;
    },
  );
  if (isLoading || castIsLoading || recommendationsIsLoading) {
    return (
      <div className="mx-auto w-12 pt-96">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data && cast && <Details data={data} cast={cast} />}
      <h2 className="mt-12 mb-6 text-2xl md:text-3xl font-bold">
        Similar {mediaType === "movie" ? "movies" : "TV shows"}
      </h2>
      <Swiper breakpoints={breakpoints} loop={true} centeredSlides={true}>
        {recommendations?.map((media: IMedia) => (
          <SwiperSlide key={media.id}>
            <Card data={media} type={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
      {data?.images.backdrops && data?.images.posters && (
        <DetailsTabs backdrops={data?.images.backdrops} posters={data?.images.posters} />
      )}
    </>
  );
};

export default Media;

const breakpoints = {
  "360": {
    slidesPerView: 2.5,
    spaceBetween: 5,
  },
  "600": {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  "768": {
    slidesPerView: 6,
    spaceBetween: 20,
  },
};
