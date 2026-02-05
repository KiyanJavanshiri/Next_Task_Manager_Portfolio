import { cookies } from "next/headers";

export const deleteSession = async () => {
  const cookie = await cookies();
  cookie.delete("session");
};
