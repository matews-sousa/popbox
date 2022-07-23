import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, Transition } from "@headlessui/react";

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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="text-white px-8 py-5 flex justify-between border-b-[0.5px] border-gray-700 z-50 fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-50">
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
        <Menu as="div" className="dropdown dropdown-end">
          <Menu.Button as="div" className="btn btn-ghost btn-sm rounded-btn" tabIndex={0}>
            {currentUser.email}
          </Menu.Button>
          <Menu.Items
            as="ul"
            className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            tabIndex={0}
          >
            <Menu.Item as="li">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item as="li">
              <span onClick={handleLogout}>Logout</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
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
