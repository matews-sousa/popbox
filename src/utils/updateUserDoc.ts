import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Data {
  username?: string;
  displayName: string;
  email?: string;
  photoUrl?: string;
}

const updateUserDoc = async (userId: string, data: Data) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    await setDoc(docRef, {
      ...docSnap.data(),
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

export default updateUserDoc;
