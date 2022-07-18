import { useQuery } from "react-query";
import CardList from "../components/CardList";
import Container from "../components/Container";
import Loader from "../components/Loader";
import api from "../lib/api";
import { IMedia } from "../types/IMedia";

const Series = () => {
  const { data, isLoading } = useQuery<IMedia[]>("series", async () => {
    const { data } = await api.get("/tv/popular");
    return data.results;
  });

  if (isLoading) {
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
        <CardList data={data} type="serie" />
      </div>
    </Container>
  );
};

export default Series;
