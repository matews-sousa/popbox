import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import Container from "../components/Container";
import api from "../lib/api";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { IMedia } from "../types/IMedia";

const Search = () => {
  const [search, setSearch] = useState("");
  const {
    data: movieResults,
    isLoading: isLoadingMovieResults,
    refetch: refetchMovieResults,
  } = useQuery<IMedia[]>("movieResults", async () => {
    if (search) {
      const { data } = await api.get(`/search/movie?query=${search}`);
      return data.results;
    }
    return null;
  });
  const {
    data: tvResults,
    isLoading: isLoadingTvResults,
    refetch: refetchTvResults,
  } = useQuery<IMedia[]>("tvResults", async () => {
    if (search) {
      const { data } = await api.get(`/search/tv?query=${search}`);
      return data.results;
    }
    return null;
  });

  // join the results of both movie and tv if they exist, else, just return the results of the one who exists
  const data =
    movieResults && tvResults
      ? [...movieResults, ...tvResults].sort((a, b) => b.popularity - a.popularity)
      : movieResults || tvResults;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      refetchMovieResults();
      refetchTvResults();
    }
  };

  return (
    <Container>
      <div className="py-32">
        <form className="flex mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a Movie or TV Serie..."
            className="input input-bordered rounded-r-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-square btn-error rounded-l-none" type="submit">
            <MdSearch className="h-6 w-6" />
          </button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data
            ? data.map((media, index) => (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index / 30 }}
                >
                  <Card data={media} type={media.original_title ? "movie" : "serie"} />
                </motion.div>
              ))
            : null}
        </div>
      </div>
    </Container>
  );
};

export default Search;
