import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const getUserWatched = async (
  userId: string,
): Promise<{ mediaId: string; mediaType: string }[]> => {
  const docRef = doc(db, "watched", userId);
  const docSnap = await getDoc(docRef);
  const watched = docSnap.data()?.watched || [];

  return watched;
};

export default getUserWatched;
