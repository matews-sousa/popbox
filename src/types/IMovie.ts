export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
  popularity: number;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  genres?: {
    id: number;
    name: string;
  }[];
  runtime: number;
}
