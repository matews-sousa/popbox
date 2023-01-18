import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Media from "./pages/Media";
import Search from "./pages/Search";

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
          <Route path="/:mediaType/:id" element={<Media />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
