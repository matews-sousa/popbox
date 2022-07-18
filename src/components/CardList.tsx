import { motion } from "framer-motion";
import Card from "../components/Card";
import { IMedia } from "../types/IMedia";

interface Props {
  data: IMedia[];
}

const CardList = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.map((media, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index / 30 }}
        >
          <Card data={media} key={media.id} />
        </motion.div>
      ))}
    </div>
  );
};

export default CardList;
