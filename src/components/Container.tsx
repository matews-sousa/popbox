import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="min-h-screen min-w-screen text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <main className="pb-32 px-8 max-w-7xl mx-auto h-full">{children}</main>
    </motion.div>
  );
};

export default Container;
