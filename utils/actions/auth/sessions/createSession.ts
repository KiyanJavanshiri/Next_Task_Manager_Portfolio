import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const createSession = async (id: string) => {
  const secretKey = process.env.JWT_SECRET_KEY!;

  const token = jwt.sign({ id }, secretKey, { expiresIn: "1h" });
  const cookie = await cookies();
  cookie.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60,
  });
};
