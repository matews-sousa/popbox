import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import CardList from "../components/CardList";
import Container from "../components/Container";
import FiltersButton from "../components/FiltersButton";
import Loader from "../components/Loader";
import api from "../lib/api";

const Series = () => {
  const [type, setType] = useState("popular");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const {
    data: popular,
    isLoading: isLoadingPopular,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["tv", type, selectedGenres],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/tv/${type}?page=${pageParam}&with_genres=${selectedGenres}`);
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    },
  );
  const { data: tvGenres, isLoading: isLoadingTvGenres } = useQuery<{ id: number; name: string }[]>(
    "tvGenres",
    async () => {
      const { data } = await api.get("/genre/tv/list");
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

  return (
    <Container>
      <div className="pt-32">
        <div className="flex flex-wrap gap-4">
          <select
            className="select select-bordered w-full max-w-xs"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="on_the_air">On the air</option>
          </select>
          <FiltersButton
            genres={tvGenres}
            selectedGenres={selectedGenres}
            handleSelect={handleGenreClick}
            clearSelection={() => setSelectedGenres([])}
          />
        </div>
        <div className="flex flex-wrap gap-2 my-5">
          {selectedGenres.length > 0 &&
            selectedGenres.map((g) => (
              <div className="badge badge-primary gap-2">
                <span>{tvGenres?.find((genre) => genre.id === g)?.name}</span>
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
        {popular && <CardList data={popular} type="serie" />}
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </Container>
  );
};

export default Series;
