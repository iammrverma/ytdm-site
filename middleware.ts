import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    // If user is logged in and tries to access /login, redirect to home
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is not logged in and trying to access protected routes → send to /login
    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
