import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { IMedia } from "../types/IMedia";
import api from "../lib/api";
import Card from "../components/Card";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [search, setSearch] = useState(query || "");
  const { data } = useQuery<IMedia[]>(["searchResults", query], async () => {
    if (query) {
      const { data: movieData } = await api.get(`/search/movie?query=${query}`);
      const { data: tvData } = await api.get(`/search/tv?query=${query}`);
      // join the results if both have data, else, return only the one who have
      const _data =
        movieData.results && tvData.results
          ? [...movieData.results, ...tvData.results].sort((a, b) => b.popularity - a.popularity)
          : movieData.results || tvData.results;

      return _data;
    }
    return null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search && search.trim() !== "") {
      setSearchParams({
        query: search,
      });
    }
  };

  return (
    <>
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
                  <Card data={media} type={media.original_title ? "movie" : "tv"} />
                </motion.div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Search;
