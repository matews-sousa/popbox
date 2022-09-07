import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { IUser } from "../types/IUser";

const getUserByUsername = async (username: string): Promise<IUser> => {
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);

  const user = {
    uid: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  } as IUser;

  return user;
};

export default getUserByUsername;
