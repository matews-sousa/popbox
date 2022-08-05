import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const findUserDoc = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    throw error;
  }
};

export default findUserDoc;
