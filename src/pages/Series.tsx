import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import CardList from "../components/CardList";
import Container from "../components/Container";
import GenresFilter from "../components/GenresFilter";
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
  const { data: tvGenres, isLoading: isLoadingTvGenres } = useQuery("tvGenres", async () => {
    const { data } = await api.get("/genre/tv/list");
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

  if (isLoadingPopular || isLoadingTvGenres) {
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
            <option value="top_rated">Top Rated</option>
            <option value="on_the_air">On the air</option>
          </select>
        </div>
        <GenresFilter
          genres={tvGenres}
          selectedGenres={selectedGenres}
          handleGenreClick={handleGenreClick}
        />
        {popular && <CardList data={popular} type="serie" />}
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </Container>
  );
};

export default Series;
