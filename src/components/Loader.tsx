import { motion } from "framer-motion";

const variants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        repeat: Infinity,
        duration: 0.5,
      },
      y: {
        repeat: Infinity,
        duration: 0.25,
      },
    },
  },
};

const Loader = () => {
  return (
    <>
      <motion.div
        className="w-8 h-8 rounded-full bg-white"
        variants={variants}
        animate="animationOne"
      ></motion.div>
    </>
  );
};

export default Loader;
