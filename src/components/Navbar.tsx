import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";

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
    href: "/search",
    text: "Search",
  },
];

const Navbar = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <nav className="text-white px-8 py-5 flex items-center justify-between border-b-[0.5px] border-gray-700 z-50 fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-50">
      <Link className="text-2xl font-bold" to="/">
        PopBox
      </Link>
      <ul className="space-x-5 hidden md:flex">
        {links.map((link) => (
          <Link
            className={`font-semibold h-full hover:text-white ${
              location.pathname === link.href
                ? "text-white border-b-2 border-red-400"
                : "text-gray-200"
            }`}
            to={link.href}
          >
            {link.text}
          </Link>
        ))}
      </ul>
      {currentUser ? (
        <ProfileMenu />
      ) : (
        <ul className="flex space-x-3">
          <li>
            <Link className="btn btn-primary btn-sm" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost btn-sm" to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
