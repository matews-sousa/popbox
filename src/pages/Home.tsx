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
import { Link } from "react-router-dom";
import CardList from "../components/CardList";

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
  const { data, isLoading } = useQuery("home", async () => {
    const { data } = await api.get("/movie/now_playing");
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
      <div className="absolute top-24 left-0 w-screen">
        <Swiper
          breakpoints={breakpoints}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {data.results.map((movie: IMovie) => (
            <SwiperSlide key={movie.id} style={{ height: 400 }}>
              <Link to={`/movie/${movie.id}`}>
                <MovieInfo movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pt-[550px]">
        <CardList data={data.results} />
      </div>
    </Container>
  );
};

export default Home;
