import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import CardList from "../components/CardList";
import Container from "../components/Container";
import Loader from "../components/Loader";
import api from "../lib/api";
import { IMedia } from "../types/IMedia";

const Series = () => {
  const {
    data: popular,
    isLoading: isLoadingPopular,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["tv"],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/tv/popular?page=${pageParam}`);
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    },
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoadingPopular) {
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
        <CardList data={popular} type="serie" />
        <div className="w-full h-44" ref={ref}></div>
      </div>
    </Container>
  );
};

export default Series;
