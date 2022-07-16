import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
