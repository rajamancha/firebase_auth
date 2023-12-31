"use client";
import {
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { UploadImage, getUser } from "@/services/auth.services";
import { logInUserType } from "@/services/auth.types";
import { useContext, createContext, useState, useEffect } from "react";
import isBase64DataURL from "@/utils/baseurl";

export interface AuthContextType {
  loader: boolean;
  user: UserCredential["user"] | null;
  logOutHandler: () => Promise<void>;
  logInHandler: (payload: logInUserType) => Promise<void>;
  handleProfile: (data: HandleProfileType) => {};
}

export type HandleProfileType = {
  displayName: string;
  photoURL: string;
};

const AuthContext = createContext<AuthContextType>({
  loader: false,
  logInHandler: async () => {},
  logOutHandler: async () => {},
  handleProfile: async () => {},
  user: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserCredential["user"] | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { error } = await getUser();
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const _user = JSON.parse(userJson);
        setUser(_user);
        if (error) {
          router.push("/");
          setUser(null);
          localStorage.removeItem("user");
          return;
        }
      }
      setLoader(false);
    })();
  }, []);

  const logOutHandler = async () => {
    setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  const logInHandler = async (payload: logInUserType) => {
    setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  const handleSuccess = async (user: UserCredential["user"]) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    const { refreshToken } = user;
    await axios.post("api/auth/signupwithgoogle", {
      refreshToken,
    });
    setUser(user);
    alert("Authenticated");
    router.push("/dashboard");
  };

  const handleProfile = async ({
    displayName,
    photoURL,
  }: HandleProfileType) => {
    setLoader(true);

    try {
      const isUploadingNewImage = isBase64DataURL(photoURL);

      if (isUploadingNewImage) {
        const imageUrl = await UploadImage(photoURL);
        if (imageUrl.url) {
          photoURL = imageUrl.url;
        }
      }

      updateProfile(auth.currentUser as User, {
        displayName,
        photoURL,
      })
        .then(() => {
          const user = auth.currentUser;
          setUser(JSON.parse(JSON.stringify(user)));
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user));
          setLoader(false);
        })
        .catch((error) => {
          alert(error.code);
        });
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoader(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loader, user, logOutHandler, logInHandler, handleProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
