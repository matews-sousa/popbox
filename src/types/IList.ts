import { IMedia } from "./IMedia";

export interface IList {
  id: string;
  name: string;
  public: boolean;
  medias: IMedia[];
  createdAt: Date;
}
