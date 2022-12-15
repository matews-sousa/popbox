import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import CardList from "../components/CardList";
import Container from "../components/Container";
import FiltersButton from "../components/FiltersButton";
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
    refetch,
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
  const { data: movieGenres, isLoading: isLoadingMovieGenres } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >("movieGenres", async () => {
    const { data } = await api.get("/genre/movie/list");
    return data.genres;
  });
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

  return (
    <Container>
      <div className="pt-32">
        <div className="flex gap-4">
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
          <FiltersButton
            genres={movieGenres}
            selectedGenres={selectedGenres}
            handleSelect={handleGenreClick}
            clearSelection={() => setSelectedGenres([])}
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedGenres.length > 0 &&
            selectedGenres.map((g) => (
              <div className="badge badge-primary gap-2">
                <span>{movieGenres?.find((genre) => genre.id === g)?.name}</span>
                <button
                  onClick={() => {
                    setSelectedGenres(selectedGenres.filter((genre) => genre !== g));
                  }}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
        </div>
        {popular && <CardList data={popular} type="movie" />}
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </Container>
  );
};

export default Movies;
