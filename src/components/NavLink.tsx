import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

interface Props {
  href: string;
  text: string;
  icon?: IconType;
  active: boolean;
}

const NavLink = ({ href, text, icon, active }: Props) => {
  const Icon = icon;

  return (
    <Link
      key={href}
      to={href}
      className={`${
        active ? "text-white" : "text-gray-500"
      } flex items-center space-x-2 relative px-3 py-1`}
    >
      {Icon && <Icon type="button" className="w-8 h-8" />}
      {active && (
        <motion.span className="text-md font-medium" initial={{ y: 50 }} animate={{ y: 0 }}>
          {text}
        </motion.span>
      )}
      {active && (
        <motion.div
          layoutId="outline"
          className="absolute top-0 right-0 w-full h-full rounded-full bg-cyan-700 bg-opacity-100 -z-10"
          initial={false}
          transition={spring}
        ></motion.div>
      )}
    </Link>
  );
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

export default NavLink;
