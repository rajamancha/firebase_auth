"use client";
import React, { useContext } from "react";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { logInUserType } from "@/services/auth.types";
import { logInUser } from "@/services/auth.services";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const { push } = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: logInUserType = {
      logInMethod: "email",
      user: {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      },
    };

    try {
      createUserWithEmailAndPassword(
        auth,
        event.currentTarget.email.value,
        event.currentTarget.password.value
      )
        .then((data) => {
          console.log(data);
          debugger;
        })
        .catch((error) => {
          console.log(error);
          debugger;
        });
      // await logInUser(payload);

      // alert(JSON.stringify(data));

      // // redirect the user to /dashboard
      // push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  const signInWithGoogle = () => {
    try {
      push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <main>
      <div className="container"></div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/vercel.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  // autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  // autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="my-6">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-gray-500"
            >
              Sign up with Google
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;