import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    const cookie = serialize(COOKIE_NAME, refreshToken, {
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
      headers: { "Set-Cookie": cookie },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
}
