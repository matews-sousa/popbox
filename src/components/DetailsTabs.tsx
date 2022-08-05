import { useEffect, useState } from "react";
import { IImage } from "../types/IImage";
import ImagesList from "./ImagesList";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose, MdDownload } from "react-icons/md";
import axios from "axios";

interface Props {
  backdrops: IImage[];
  posters: IImage[];
}

const tabs = ["Backdrops", "Posters"];

const DetailsTabs = ({ backdrops, posters }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const handleImageClick = (src: string) => {
    setActiveImage(src);
    setIsOpen(true);
  };

  const downloadImage = (e: any) => {
    // download image as png
    e.preventDefault();
    axios({
      method: "get",
      url: activeImage,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.png");
      document.body.appendChild(link);
      link.click();
    });
  };

  const tabsContent = [
    <ImagesList images={backdrops} handleImageClick={handleImageClick} />,
    <ImagesList images={posters} handleImageClick={handleImageClick} />,
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex mt-10 mb-3">
        {tabs.map((tab, index) => (
          <button
            onClick={() => setActiveTab(index)}
            key={tab}
            className={`font-normal text-md md:text-2xl py-2 px-3 md:px-5 relative ${
              activeTab === index && "bg-gray-800"
            }`}
          >
            {tab}
            {activeTab === index && (
              <motion.div
                className="w-full h-1 bg-red-500 absolute -bottom-1 left-0 right-0"
                layoutId="underline"
              ></motion.div>
            )}
          </button>
        ))}
      </div>

      <div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: "50vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "50vh" }}
            transition={{ duration: 0.2 }}
            className="min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-gray-800 scrollbar-track-gray-700"
          >
            {tabsContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute top-5 right-5 z-50 space-x-5">
            <button onClick={(e) => downloadImage(e)} className="btn btn-circle btn-ghost">
              <MdDownload className="h-10 w-10" />
            </button>
            <button onClick={() => setIsOpen(false)} className="btn btn-circle btn-secondary">
              <MdClose className="h-10 w-10" />
            </button>
          </div>
          <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60"></div>
          <div className="absolute inset-0 flex justify-center items-center p-12 md:p-44">
            <img src={activeImage} className="w-auto h-auto max-h-screen" />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsTabs;
