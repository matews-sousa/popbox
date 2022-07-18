import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import api from "../lib/api";
import Loader from "../components/Loader";
import { ICast } from "../types/ICast";
import Details from "../components/Details";
import { IMedia } from "../types/IMedia";

const Serie = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<IMedia>("serie", async () => {
    const { data } = await api.get(`/tv/${id}`);
    return data;
  });
  const { data: cast, isLoading: castLoading } = useQuery<ICast[]>("cast", async () => {
    const { data } = await api.get(`/tv/${id}/credits`);
    return data.cast;
  });

  if (isLoading || castLoading) {
    return (
      <Container>
        <div className="mx-auto w-12 pt-96">
          <Loader />
        </div>
      </Container>
    );
  }

  return <Container>{data && cast && <Details data={data} cast={cast} />}</Container>;
};

export default Serie;
