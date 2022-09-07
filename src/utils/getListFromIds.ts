import api from "../lib/api";

type list = {
  mediaId: string;
  mediaType: string;
};

const getListFromIds = async (list: list[]) => {
  const fetchedList = list.map(async (fav) => {
    const { data } = await api.get(`/${fav.mediaType}/${fav.mediaId}`);
    return data;
  });
  const finalList = await Promise.all(fetchedList);
  return finalList;
};

export default getListFromIds;
