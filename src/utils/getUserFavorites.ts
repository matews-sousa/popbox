import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const getUserFavorites = async (
  userId: string,
): Promise<{ mediaId: string; mediaType: string }[]> => {
  const docRef = doc(db, "favorites", userId);
  const docSnap = await getDoc(docRef);
  const favorites = docSnap.data()?.favorites || [];

  return favorites;
};

export default getUserFavorites;
