import axios, { AxiosError } from "axios";
import { logInUserType } from "./auth.types";

export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
};

export const logInUser = async (payload: logInUserType) => {
  try {
    const { data } = await axios.post("/api/auth/login", payload);
    return {
      data: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      data: null,
      error,
    };
  }
};
