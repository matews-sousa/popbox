import { useInfiniteQuery, useQuery } from "react-query";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import MovieInfo from "../components/MovieInfo";
import { Link } from "react-router-dom";
import CardList from "../components/CardList";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const breakpoints = {
  "360": {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  "600": {
    slidesPerView: 1.2,
    spaceBetween: 10,
  },
  "768": {
    slidesPerView: 2.1,
    spaceBetween: 20,
  },
};

const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: popular,
    isLoading: isLoadingPopular,
    fetchNextPage,
  } = useInfiniteQuery(
    ["popular"],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/movie/popular?page=${pageParam}`);
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    },
  );
  const { data: nowPlaying, isLoading: isLoadingNowPlaying } = useQuery("now_playing", async () => {
    const { data } = await api.get("/movie/now_playing");
    return data;
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoadingPopular || isLoadingNowPlaying) {
    return (
      <div className="mx-auto w-12 pt-96">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="absolute top-24 left-0 w-full">
        <Swiper
          breakpoints={breakpoints}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {nowPlaying.results.map((movie: IMovie) => (
            <SwiperSlide key={movie.id} style={{ height: 400 }}>
              <Link to={`/movie/${movie.id}`}>
                <MovieInfo movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pt-[550px]">
        <CardList data={popular} />

        <div className="w-full h-44" ref={ref}></div>
      </div>
    </>
  );
};

export default Home;
