import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import getUserFavorites from "../utils/getUserFavorites";

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
      await setDoc(docRef, { favorites: newFavs });
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchFavs = async () => {
      const favs = await getUserFavorites(currentUser.uid);
      setFavorites(favs);
    };
    fetchFavs();
  }, []);

  return (
    <button
      className="p-3 border border-white rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      {isFavorite ? <BsHeartFill className="text-white" /> : <BsHeart className="text-white" />}
    </button>
  );
};

export default FavoriteButton;
