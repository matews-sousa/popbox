import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import CardList from "../components/CardList";
import Container from "../components/Container";
import GenresFilter from "../components/GenresFilter";
import Loader from "../components/Loader";
import api from "../lib/api";

const Movies = () => {
  const [type, setType] = useState("popular");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const {
    data: popular,
    isLoading: isLoadingPopular,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["movies", type, selectedGenres],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(
        `/movie/${type}?page=${pageParam}&with_genres=${selectedGenres}`,
      );
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    },
  );
  const { data: movieGenres, isLoading: isLoadingMovieGenres } = useQuery(
    "movieGenres",
    async () => {
      const { data } = await api.get("/genre/movie/list");
      return data.genres;
    },
  );
  const { ref, inView } = useInView();

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoadingPopular || isLoadingMovieGenres) {
    return (
      <Container>
        <div className="mx-auto w-12 pt-96">
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-32">
        <div>
          <select
            className="select select-bordered w-full max-w-xs mb-4"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="now_playing">Now Playing</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <GenresFilter
          genres={movieGenres}
          selectedGenres={selectedGenres}
          handleGenreClick={handleGenreClick}
        />
        {popular && <CardList data={popular} type="movie" />}
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </Container>
  );
};

export default Movies;
