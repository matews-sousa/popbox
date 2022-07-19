export interface IImages {
  id: number;
  backdrops: IImage[];
  posters: IImage[];
  logos: IImage[];
}

export interface IImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
