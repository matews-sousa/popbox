export interface ISerie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genres: {
    id: number;
    name: string;
  }[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
}
