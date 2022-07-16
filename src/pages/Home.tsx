import { useQuery } from "react-query";
import Card from "../components/Card";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import MovieInfo from "../components/MovieInfo";

const Home = () => {
  const { data, isLoading } = useQuery("home", async () => {
    const { data } = await api.get("/movie/now_playing");
    return data;
  });

  console.log(data);

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
      <div className="absolute top-0 right-0 w-screen">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {data.results.map((movie: IMovie) => (
            <SwiperSlide key={movie.id} style={{ height: 600 }}>
              <MovieInfo movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-[650px]">
        {data.results.map((movie: IMovie, index: number) => (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index / 30 }}
          >
            <Card movie={movie} key={movie.id} />
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
