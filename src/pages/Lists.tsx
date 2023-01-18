import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import CardList from "../components/CardList";
import FiltersButton from "../components/FiltersButton";
import api from "../lib/api";

const Lists = () => {
  const { mediaType } = useParams<{ mediaType: "movie" | "tv" }>();
  const [type, setType] = useState("popular");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { data: popular, fetchNextPage } = useInfiniteQuery(
    [mediaType, type, selectedGenres],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(
        `/${mediaType}/${type}?page=${pageParam}&with_genres=${selectedGenres}`,
      );
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    },
  );
  const { data: genres } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >(`${mediaType}Genres`, async () => {
    const { data } = await api.get(`/genre/${mediaType}/list`);
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
    <>
      <div className="pt-32">
        <div className="flex flex-wrap gap-4">
          <select
            className="select select-bordered w-full max-w-xs"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {mediaType === "movie" ? (
              <>
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
              </>
            ) : (
              <>
                <option value="popular">Popular</option>
                <option value="top_rated">Top Rated</option>
                <option value="on_the_air">On the air</option>
              </>
            )}
          </select>
          <FiltersButton
            genres={genres}
            selectedGenres={selectedGenres}
            handleSelect={handleGenreClick}
            clearSelection={() => setSelectedGenres([])}
          />
        </div>
        <div className="flex flex-wrap gap-2 my-5">
          {selectedGenres.length > 0 &&
            selectedGenres.map((g) => (
              <div className="badge badge-primary gap-2" key={g}>
                <span>{genres?.find((genre) => genre.id === g)?.name}</span>
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
        {popular && <CardList data={popular} type={mediaType} />}
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </>
  );
};

export default Lists;
