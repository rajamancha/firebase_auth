import { LoginForm } from "@/form";
import { LoginFormType } from "@/form/LoginForm";
import Link from "next/link";

const LoginLayout = ({ formType }: LoginFormType) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/vercel.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {formType} to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm formType={formType} />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            href={formType === "Sign in" ? "/signup" : "/login"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            {formType === "Sign in" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginLayout;
