import { AnimatePresence } from "framer-motion";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth } from "./contexts/AuthContext";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import MyFavorites from "./pages/MyFavorites";
import NewList from "./pages/NewList";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Serie from "./pages/Serie";
import Series from "./pages/Series";
import SignUp from "./pages/SignUp";

const RequiredAuth = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <BottomNav />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequiredAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/my-favorites" element={<MyFavorites />} />
            <Route path="/profile/new-list" element={<NewList />} />
            <Route path="/profile/list/:id" element={<List />} />
          </Route>
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-series" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/serie/:id" element={<Serie />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
