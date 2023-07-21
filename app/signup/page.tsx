"use client";

import React from "react";
import Link from "next/link";
import { UserAuth } from "../provider/AuthProvider";
import { Button, Input } from "@/components/form";

const SignUp = () => {
  const { logInHandler } = UserAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    logInHandler({
      logInMethod: "email",
      accountType: "signup",
      user: {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      },
    });
  };

  const signInWithGoogle = () => {
    logInHandler({ logInMethod: "google" });
  };

  return (
    <main>
      <div className="container">
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <Input
                label="Email address:"
                name="email"
                type="email"
                required
              />

              <Input
                label="Password:"
                name="password"
                type="password"
                required
              />
              <Button title="Sign up" type="submit" />
            </form>

            <Button
              title="Sign up with Google"
              variant="outline"
              onClick={signInWithGoogle}
            />

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
      </div>
    </main>
  );
};

export default SignUp;
