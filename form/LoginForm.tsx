"use client";
import { Button, Input } from "@/components/form";
import { UserAuth } from "@/provider/AuthProvider";
import React, { ChangeEvent, useState } from "react";

export interface LoginFormType {
  formType: "Sign in" | "Sign up";
}
const LoginForm = ({ formType }: LoginFormType) => {
  const { logInHandler, loader } = UserAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    logInHandler({
      logInMethod: "email",
      accountType: formType === "Sign in" ? "login" : "signup",
      user: {
        email: form.email,
        password: form.password,
      },
    });
  };

  const signInWithGoogle = () => {
    logInHandler({ logInMethod: "google" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input
          label="Email address:"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password:"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <Button title={formType} type="submit" />
      </form>
      <Button
        title={`${formType} with Google`}
        variant="outline"
        onClick={signInWithGoogle}
      />
    </>
  );
};

export default LoginForm;
