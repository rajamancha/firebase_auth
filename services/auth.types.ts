import { AxiosError } from "axios";

export interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export type logInUserType =
  | {
      email: string;
      password: string;
    }
  | {
      logInMethod: "email";
      user: {
        email: string;
        password: string;
      };
    }
  | {
      logInMethod: "google";
    };
