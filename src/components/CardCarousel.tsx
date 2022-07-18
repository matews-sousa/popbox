import Card from "../components/Card";
import { IMovie } from "../types/IMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import { Link } from "react-router-dom";
import { ISerie } from "../types/ISerie";

const breakpoints = {
  "360": {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  "600": {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  "768": {
    slidesPerView: 5,
    spaceBetween: 10,
  },
};

interface Props {
  data: IMovie[] & ISerie[];
  title: string;
  type: string;
  seeMoreUrl: string;
}

const CardCarousel = ({ data, title, type, seeMoreUrl }: Props) => {
  return (
    <div>
      <div className="flex justify-between pr-8 md:pr-24">
        <h3 className="text-xl mb-5 font-semibold">{title}</h3>
        <Link to={seeMoreUrl}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            See more
          </button>
        </Link>
      </div>
      <Swiper breakpoints={breakpoints} modules={[Autoplay]}>
        {data.map((movie: any) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
