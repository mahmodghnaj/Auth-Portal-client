import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";
import { isAuthenticated } from "@/lib/auth";

// Define an array of paths that don't require authentication
const pathWithoutAuth = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/password-change",
];

// Define an array of public paths
const publicPath = ["/auth/confirm-email"];

// Create a middleware factory named "authorization"
export const authorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Extract the pathname from the request URL
    const pathname = request.nextUrl.pathname;

    // Check if the path is for static assets (e.g., /_next/ or favicon.ico)
    if (pathname.startsWith("/_next/") || pathname.includes("favicon.ico")) {
      // Allow these requests to continue without further processing
      return NextResponse.next();
    }

    // Check if the user is authenticated
    const isAuth = await isAuthenticated(request);

    // Check if the path requires authentication and the user is not authenticated
    if (![...pathWithoutAuth, ...publicPath].includes(pathname) && !isAuth) {
      // Redirect the user to the login page
      const url = new URL(`/auth/login`, request.url);
      return NextResponse.redirect(url);
    }

    // Check if the path doesn't require authentication but the user is authenticated
    if (pathWithoutAuth.includes(pathname) && isAuth) {
      // Redirect the user to the home page
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }
  };
};
