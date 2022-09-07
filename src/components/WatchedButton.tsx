import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import getUserList from "../utils/getUserList";

interface Props {
  mediaId: string;
  mediaType: "movie" | "tv";
}

const WatchedButton = ({ mediaId, mediaType }: Props) => {
  const { currentUser } = useAuth();
  const [watched, setWatched] = useState<{ mediaId: string; mediaType: string }[]>([]);
  const isWatched = watched.some((watches) => watches.mediaId === mediaId);

  const handleClick = async () => {
    if (currentUser) {
      const docRef = doc(db, "watched", currentUser?.uid);
      let newWatches = [];
      if (watched.some((fav) => fav.mediaId === mediaId))
        newWatches = watched.filter((fav) => fav.mediaId !== mediaId);
      else newWatches = [...watched, { mediaId, mediaType }];
      setWatched(newWatches);
      await setDoc(docRef, { list: newWatches });
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchWatched = async () => {
      const watches = await getUserList(currentUser.uid, "watched");
      setWatched(watches);
    };
    fetchWatched();
  }, []);

  return (
    <button onClick={handleClick}>
      {isWatched ? (
        <MdRemoveRedEye className="text-green-600 text-4xl" />
      ) : (
        <MdOutlineRemoveRedEye className="text-white text-4xl" />
      )}
    </button>
  );
};

export default WatchedButton;
