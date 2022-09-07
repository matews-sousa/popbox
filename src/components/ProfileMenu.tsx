import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProfileMenu = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatar = currentUser?.photoURL ? (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={currentUser?.photoURL} />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
        <span className="text-xl">{currentUser?.username?.charAt(0).toUpperCase()}</span>
      </div>
    </div>
  );

  return (
    <Menu as="div" className="dropdown dropdown-end">
      <Menu.Button as="div" className="cursor-pointer flex items-center space-x-2" tabIndex={0}>
        {avatar}
        <h2 className="font-semibold">{currentUser?.username}</h2>
      </Menu.Button>
      <Menu.Items
        as="ul"
        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        tabIndex={0}
      >
        <Menu.Item as="li">
          <Link to={`/${currentUser?.username}`}>Profile</Link>
        </Menu.Item>
        <Menu.Item as="li">
          <span onClick={handleLogout}>Logout</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProfileMenu;
