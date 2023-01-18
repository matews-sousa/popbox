import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Serie from "./pages/Serie";

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
          <Route path="/:mediaType" element={<Lists />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/serie/:id" element={<Serie />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
