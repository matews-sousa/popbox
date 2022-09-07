import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const getUserList = async (
  userId: string,
  list: "favorites" | "watched",
): Promise<{ mediaId: string; mediaType: string }[]> => {
  const docRef = doc(db, list, userId);
  const docSnap = await getDoc(docRef);
  const finalList = docSnap.data()?.list || [];

  return finalList;
};

export default getUserList;
