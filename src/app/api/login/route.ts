// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = sign({ username }, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });

    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
