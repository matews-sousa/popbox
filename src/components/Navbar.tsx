import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import navLinks from "../constants/navLinks";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`text-white px-8 h-20 flex justify-between items-center border-b-[0.5px] border-gray-700 z-40 fixed top-0 left-0 right-0 transition-all bg-gray-900 ${
        scrollPosition > 0 ? "bg-opacity-100" : "bg-opacity-75"
      }`}
    >
      <Link className="text-2xl font-bold" to="/">
        PopBox
      </Link>
      <ul className="space-x-5 hidden md:flex h-full">
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={`h-full flex items-center transition-all ${
              location.pathname === link.href
                ? "text-white border-b-2 border-red-400"
                : "text-gray-400"
            }`}
          >
            <Link className={"font-semibold hover:text-white"} to={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
