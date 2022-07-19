import { IImage } from "../types/IImage";

interface Props {
  backdrops?: IImage[];
}

const ImagesList = ({ backdrops }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {backdrops?.map((backdrop) => (
        <img
          key={backdrop.file_path}
          src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
          alt="backdrop"
          className=""
        />
      ))}
    </div>
  );
};

export default ImagesList;
