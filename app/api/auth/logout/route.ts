import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function GET(request: Request) {
  // Always check this
  const secret = process.env.JWT_SECRET || "";

  const token = sign({}, secret, {
    expiresIn: MAX_AGE,
  });

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
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
