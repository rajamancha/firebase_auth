import { auth } from "@/app/firebase";
import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

const sendResponse = (message: string, status: number) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status,
    }
  );
};
export async function POST(request: Request) {
  const body = await request.json();

  // switch (body.logInMethod) {
  //   case "email":
  //     const { email, password } = body.user;
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((data) => {
  //         const token = sign(
  //           {
  //             email,
  //           },
  //           data.user.refreshToken,
  //           {
  //             expiresIn: MAX_AGE,
  //           }
  //         );
        
  //         const seralized = serialize(COOKIE_NAME, token, {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV === "production",
  //           sameSite: "strict",
  //           maxAge: MAX_AGE,
  //           path: "/",
  //         });
        
  //         const response = {
  //           message: "Authenticated!",
  //         };
        
  //         return new Response(JSON.stringify(response), {
  //           status: 200,
  //           headers: { "Set-Cookie": seralized },
  //         });
  //       })
  //       .catch((error) => {
  //         return sendResponse("Something went wrong!",400)
  //       });

  //   case "google":
  //     return new Response(
  //       JSON.stringify({
  //         message: "Authenticated!",
  //       }),
  //       {
  //         status: 200,
  //       }
  //     );
  //   default:
  //     return new Response(
  //       JSON.stringify({
  //         message: "Something went wrong!",
  //       }),
  //       {
  //         status: 500,
  //       }
  //     );
  // }

  const { email, password } = body;

  if (email !== "admin" || password !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      email,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
