import { Link } from "react-router-dom";
import { IMedia } from "../types/IMedia";
import Image from "./Image";

interface Props {
  data: IMedia;
  type?: "movie" | "serie";
}

const Card = ({ data, type = "movie" }: Props) => {
  return (
    <Link to={`/${type}/${data.id}`} className="group">
      <Image
        src={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
        className="rounded-md w-full shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200"
      />
      <h1 className="mt-3 md:font-semibold text-sm md:text-md">{data?.title || data?.name}</h1>
    </Link>
  );
};

export default Card;
