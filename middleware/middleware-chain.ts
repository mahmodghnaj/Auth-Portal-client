import { NextMiddleware, NextResponse } from "next/server";
import { MiddlewareFactory } from "./type";

export function middlewareChain(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = middlewareChain(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
