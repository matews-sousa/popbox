import React from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import Container from "../components/Container";
import api from "../lib/api";
import { IMovie } from "../types/IMovie";

const Home = () => {
  const { data, status } = useQuery("home", async () => {
    const { data } = await api.get("/now_playing");
    return data;
  });

  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((movie: IMovie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
