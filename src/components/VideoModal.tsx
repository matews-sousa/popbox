import React from "react";
import { MdClose } from "react-icons/md";

interface Props {
  videoKey: string;
  setIsOpen: (isOpen: boolean) => void;
}

const VideoModal = ({ videoKey, setIsOpen }: Props) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute top-5 right-5 z-50 space-x-5">
        <button onClick={() => setIsOpen(false)} className="btn btn-circle btn-secondary">
          <MdClose className="h-10 w-10" />
        </button>
      </div>
      <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60"></div>
      <div className="absolute inset-0 flex justify-center items-center p-12 md:p-44">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
