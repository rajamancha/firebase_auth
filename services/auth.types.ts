import { AxiosError } from "axios";

export interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export type logInUserType =
  | {
      logInMethod: "email";
      accountType: "signup" | "login";
      user: {
        email: string;
        password: string;
      };
    }
  | {
      logInMethod: "google";
    };
