import { IoHome } from "react-icons/io5";
import { MdLocalMovies, MdOutlineMovie, MdSearch } from "react-icons/md";

const navLinks = [
  {
    href: "/",
    text: "Home",
    icon: IoHome,
  },
  {
    href: "/movie",
    text: "Movies",
    icon: MdLocalMovies,
  },
  {
    href: "/tv",
    text: "TV",
    icon: MdOutlineMovie,
  },
  {
    href: "/search",
    text: "Search",
    icon: MdSearch,
  },
];

export default navLinks;
