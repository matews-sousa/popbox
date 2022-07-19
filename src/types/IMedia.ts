import { IImages } from "./IImage";

export interface IMedia {
  id: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  images: IImages;
  videos: {
    results: {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      site: string;
      official: boolean;
      published_at: string;
      size: number;
      type: string;
    }[];
  };
  genres_ids: number[];
  vote_average: number;
  popularity: number;
  original_language: string;
  vote_count: number;
  title?: string;
  release_date?: string;
  original_title?: string;
  runtime?: number;
  name?: string;
  first_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  episode_run_time?: number[];
  origin_country?: string[];
  original_name?: string;
}
