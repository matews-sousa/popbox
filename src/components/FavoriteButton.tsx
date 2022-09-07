import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import getUserList from "../utils/getUserList";

interface Props {
  mediaId: string;
  mediaType: "movie" | "tv";
}

const FavoriteButton = ({ mediaId, mediaType }: Props) => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<{ mediaId: string; mediaType: string }[]>([]);
  const isFavorite = favorites.some((fav) => fav.mediaId === mediaId);

  const handleClick = async () => {
    if (currentUser) {
      const docRef = doc(db, "favorites", currentUser?.uid);
      let newFavs = [];
      if (favorites.some((fav) => fav.mediaId === mediaId))
        newFavs = favorites.filter((fav) => fav.mediaId !== mediaId);
      else newFavs = [...favorites, { mediaId, mediaType }];
      setFavorites(newFavs);
      await setDoc(docRef, { list: newFavs });
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchFavs = async () => {
      const favs = await getUserList(currentUser.uid, "favorites");
      setFavorites(favs);
    };
    fetchFavs();
  }, []);

  return (
    <button onClick={handleClick}>
      {isFavorite ? (
        <BsHeartFill className="text-red-500 text-3xl" />
      ) : (
        <BsHeart className="text-white text-3xl" />
      )}
    </button>
  );
};

export default FavoriteButton;
