import { useLocation } from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";
import navLinks from "../constants/navLinks";
import NavLink from "./NavLink";

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="z-50 fixed bottom-0 left-0 py-4 bg-gray-800 w-screen block md:hidden rounded-t-2xl">
      <AnimateSharedLayout>
        <ul className="flex items-center justify-between px-4">
          {navLinks.map((link) => (
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
