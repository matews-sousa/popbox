import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import createUserDoc from "../utils/createUserDoc";
import { IUser } from "../types/IUser";
import getUserById from "../utils/getUserById";

interface IAuth {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (username: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  sendPasswordReset: (email: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<IAuth>({} as IAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (username: string, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDoc({ username, ...res.user });

    return res;
  };

  const logout = () => {
    return signOut(auth);
  };

  const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    await createUserDoc(res.user);

    return res;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getUserById(user.uid);
        setCurrentUser(userDoc);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signIn,
    signUp,
    logout,
    sendPasswordReset,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
