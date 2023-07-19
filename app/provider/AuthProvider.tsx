"use client";
import { useContext, createContext, useState } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
// import axios from "axios";
import { auth } from "../firebase";

type UserAuthType = {
  user: null | UserCredential["user"];
  SignIn: () => Promise<void>;
  logOut: () => void;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserCredential["user"] | null>(null);

  const SignIn = async () => {
    // const { data } = await axios.post("/api/auth/login");
    // console.log(data);

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data: UserCredential) =>
      setUser(data?.user)
    );
  };

  const logOut = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, SignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
