import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { IUser } from "../types/IUser";
import getUserById from "./getUserById";

const createUserDoc = async (userData: IUser) => {
  const user = await getUserById(userData.uid);

  if (user !== null) {
    await setDoc(doc(db, "users", userData.uid), {
      username: userData.username || userData.email?.split("@")[0],
      displayName: userData.displayName,
      email: userData.email,
      photoUrl: userData.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

export default createUserDoc;
