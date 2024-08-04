// utils/auth.ts
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export function isAuthenticated() {
  const token = cookies().get("admin_token");
  if (!token) return false;

  try {
    verify(token.value, process.env.SECRET_KEY!);
    return true;
  } catch {
    return false;
  }
}
