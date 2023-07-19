import { auth } from "@/app/firebase";
import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

  } catch (error) {
    
  }

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
