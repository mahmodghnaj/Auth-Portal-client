import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";

export const authSocial: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();
    if (pathname.startsWith("/auth/social")) {
      const refreshToken = request.nextUrl.searchParams.get("refreshToken");
      const expiresIn = request.nextUrl.searchParams.get("expiresIn");
      if (refreshToken && expiresIn) {
        const expirationDate = new Date(Date.now() + parseInt(expiresIn, 10));
        response.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          expires: expirationDate,
        });
        response.cookies.set("refresh", refreshToken, {
          expires: expirationDate,
        }); //TODO::delete this where backend and frontend same domain
      }
      return response;
    }
    return next(request, _next);
  };
};
