import { motion } from "framer-motion";
import Card from "../components/Card";
import { IMedia } from "../types/IMedia";

interface Props {
  data?: {
    pages: {
      results: IMedia[];
    }[];
  };
  type?: "movie" | "serie";
}

const CardList = ({ data, type }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data?.pages.map((page) =>
        page.results.map((media, index) => (
          <motion.div
            key={media.id}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index / 30 }}
          >
            <Card data={media} type={type} />
          </motion.div>
        )),
      )}
    </div>
  );
};

export default CardList;
