import React from "react";
import { IImage } from "../types/IImage";
import Image from "./Image";

interface Props {
  images?: IImage[];
  handleImageClick: (src: string) => void;
}

const ImagesList = ({ images, handleImageClick }: Props) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
      {images?.map((image) => (
        <Image
          key={image.file_path}
          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
          className="cursor-zoom-in"
          onClick={() => handleImageClick(`https://image.tmdb.org/t/p/original${image.file_path}`)}
        />
      ))}
    </div>
  );
};

export default ImagesList;
