import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up"];

const isPublicRoute = (pathname: string) => publicRoutes.includes(pathname);

const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const cookie = await cookies();
  const secretKey = process.env.JWT_SECRET_KEY!;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const token = cookie.get("session")?.value;

  
  if (!isPublicRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  try {
    const payload = jwt.verify(token!, secretKey) as JwtPayload & {
      id?: string;
    };

    const id = payload?.id;

    if (!isPublicRoute(pathname) && !id) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }

    return NextResponse.next();
  } catch (ex) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default proxy;
