import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/movies",
    text: "Movies",
  },
  {
    href: "/tv-series",
    text: "TV Series",
  },
  {
    href: "/my-list",
    text: "My List",
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="text-white px-8 py-5 flex justify-between border-b-[0.5px] border-gray-700 z-10 fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-30">
      <Link className="text-2xl font-bold" to="/">
        PopBox
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            className={`font-semibold h-full hover:text-white ${
              location.pathname === link.href
                ? "text-white border-b-2 border-red-400"
                : "text-gray-400"
            }`}
            to={link.href}
          >
            {link.text}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
