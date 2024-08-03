// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set("admin_token", "secret-key", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
