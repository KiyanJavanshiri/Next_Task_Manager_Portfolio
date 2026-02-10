import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const getSession = async () => {
  const cookie = await cookies();
  const secretKey = process.env.JWT_SECRET_KEY!;
  const session = cookie.get("session")!.value;
  const payload = jwt.verify(session, secretKey) as JwtPayload & {
    id?: string;
  };

  return payload!.id!;
};
