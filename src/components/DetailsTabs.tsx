import { useState } from "react";
import { IImage } from "../types/IImage";
import ImagesList from "./ImagesList";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  backdrops: IImage[];
  posters: IImage[];
}

const tabs = ["Backdrops", "Posters", "Videos"];

const DetailsTabs = ({ backdrops, posters }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsContent = [
    <ImagesList backdrops={backdrops} />,
    <ImagesList backdrops={posters} />,
    <ImagesList backdrops={backdrops} />,
  ];

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
            initial={{ opacity: 0, x: "50vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-50vw" }}
            transition={{ duration: 0.2 }}
            className="min-h-[500px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-gray-800 scrollbar-track-gray-700"
          >
            {tabsContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default DetailsTabs;
