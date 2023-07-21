"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { getUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios, { AxiosError } from "axios";
import { auth } from "../firebase";
import { logInUserType } from "@/services/auth.types";

export interface AuthContextType {
  loader: boolean;
  user: UserCredential["user"] | null;
  logOutHandler: () => Promise<void>;
  logInHandler: (payload: logInUserType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loader: false,
  logInHandler: async () => {},
  logOutHandler: async () => {},
  user: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserCredential["user"] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { error } = await getUser();

      if (error) {
        router.push("/");
        return;
      }
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const _user = JSON.parse(userJson);
        setUser(_user);
      }
      // if the error did not happen, if everything is alright
      setLoader(true);
    })();
  }, []);

  const logOutHandler = async () => {
    try {
      if (confirm("are you sure you want to log out")) {
        localStorage.removeItem("user");
        await axios.get("/api/auth/logout");
        alert("Logout successfully");
        setUser(null);
        router.push("/");
      }
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  const logInHandler = async (payload: logInUserType) => {
    try {
      if (payload.logInMethod === "google") {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((data) => {
            handleSuccess(data.user);
          })
          .catch((error) => {
            alert(error.code);
          });
      } else if (payload.logInMethod === "email") {
        const { email, password } = payload.user;
        if (payload.accountType === "signup") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
              handleSuccess(data.user);
            })
            .catch((error) => {
              alert(error.code);
            });
        } else if (payload.accountType === "login") {
          signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
              handleSuccess(data.user);
            })
            .catch((error) => {
              alert(error.code);
            });
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };

  const handleSuccess = async (user: UserCredential["user"]) => {
    localStorage.setItem("user", JSON.stringify(user));
    const { refreshToken } = user;
    await axios.post("api/auth/signupwithgoogle", {
      refreshToken,
    });
    setUser(user);
    alert("Authenticated");
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ loader, user, logOutHandler, logInHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
