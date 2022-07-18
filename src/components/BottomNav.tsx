import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdLocalMovies, MdOutlineMovie, MdPerson } from "react-icons/md";
import { AnimateSharedLayout, motion } from "framer-motion";
import NavLink from "./NavLink";

const links = [
  {
    href: "/",
    text: "Home",
    icon: <IoHome className="w-8 h-8" />,
  },
  {
    href: "/movies",
    text: "Movies",
    icon: <MdLocalMovies className="w-8 h-8" />,
  },
  {
    href: "/tv-series",
    text: "TV Series",
    icon: <MdOutlineMovie className="w-8 h-8" />,
  },
  {
    href: "/profile",
    text: "Profile",
    icon: <MdPerson className="w-8 h-8" />,
  },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="z-50 fixed bottom-0 left-0 py-4 bg-gray-800 w-screen block md:hidden rounded-t-2xl">
      <AnimateSharedLayout>
        <ul className="flex items-center justify-between px-4">
          {links.map((link) => (
            <NavLink
              href={link.href}
              text={link.text}
              active={pathname === link.href}
              icon={link.icon}
              key={link.href}
            />
          ))}
        </ul>
      </AnimateSharedLayout>
    </div>
  );
};

export default BottomNav;
