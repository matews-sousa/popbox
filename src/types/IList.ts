import { IMedia } from "./IMedia";

export interface IList {
  id: string;
  name: string;
  public: boolean;
  medias: {
    mediaId: string;
    mediaType: string;
    posterPath: string;
  }[];
  createdAt: Date;
  userId: string;
}
