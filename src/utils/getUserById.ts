import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { IUser } from "../types/IUser";

const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    const user = { uid: docSnap.id, ...docSnap.data() } as IUser;

    return user;
  } catch (error) {
    throw error;
  }
};

export default getUserById;
