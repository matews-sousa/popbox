import { IImage } from "../types/IImage";
import Image from "./Image";

interface Props {
  backdrops?: IImage[];
}

const ImagesList = ({ backdrops }: Props) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-12 gap-2">
      {backdrops?.map((backdrop) => (
        <Image
          key={backdrop.file_path}
          src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
        />
      ))}
    </div>
  );
};

export default ImagesList;
