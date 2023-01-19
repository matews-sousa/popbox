import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import CardList from "../components/CardList";
import FiltersButton from "../components/FiltersButton";
import api from "../lib/api";
import { IMedia } from "../types/IMedia";
import ReactPaginate from "react-paginate";

interface PaginatedMedia {
  page: number;
  results: IMedia[];
  total_pages: number;
  total_results: number;
}

const Lists = () => {
  const { mediaType } = useParams<{ mediaType: "movie" | "tv" }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState("popular");
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { data: popular } = useQuery<PaginatedMedia>({
    queryKey: [mediaType, type, selectedGenres, page],
    queryFn: async () => {
      const { data } = await api.get(
        `/${mediaType}/${type}?page=${page}&with_genres=${selectedGenres}`,
      );
      return data;
    },
    keepPreviousData: true,
  });
  const { data: genres } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >(`${mediaType}Genres`, async () => {
    const { data } = await api.get(`/genre/${mediaType}/list`);
    return data.genres;
  });

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

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
        {popular && (
          <>
            <CardList data={popular?.results} type={mediaType} />
            <div className="flex justify-center mt-12">
              <ReactPaginate
                breakLabel={"..."}
                breakClassName={"btn btn-disabled"}
                previousLabel={"«"}
                nextLabel={"»"}
                onPageChange={(data) => {
                  setSearchParams({ page: String(data.selected + 1) });
                  setPage(data.selected + 1);
                }}
                pageRangeDisplayed={window.innerWidth > 600 ? 2 : 1}
                pageCount={Math.min(popular.total_pages, 500)}
                marginPagesDisplayed={1}
                containerClassName="btn-group"
                pageClassName="btn p-0"
                pageLinkClassName="px-4 h-full flex items-center justify-center"
                previousClassName="btn p-0"
                previousLinkClassName="px-4 h-full flex items-center justify-center"
                nextClassName="btn p-0"
                nextLinkClassName="px-4 h-full flex items-center justify-center"
                activeClassName="btn-active"
                disabledClassName="btn-disabled"
                forcePage={page - 1}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Lists;
