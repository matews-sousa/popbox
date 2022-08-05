import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import findUserDoc from "./findUserDoc";

const createUserDoc = async (userData: User) => {
  const user = await findUserDoc(userData.uid);

  if (user !== null) {
    await setDoc(doc(db, "users", userData.uid), {
      displayName: userData.displayName,
      email: userData.email,
      photoUrl: userData.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

export default createUserDoc;
