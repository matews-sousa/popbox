import React, { useCallback, useEffect, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const LoadImage = ({ src, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setImgSrc(src);
    setIsLoaded(true);
  }, [src]);

  const onError = useCallback(() => {
    setIsLoaded(false);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  if (!isLoaded) {
    return <div className="w-full h-[90%] animate-pulse bg-slate-700"></div>;
  }

  return <img {...props} src={imgSrc} alt={imgSrc} />;
};

export default LoadImage;
