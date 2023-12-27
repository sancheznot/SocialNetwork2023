export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/follow/:path*",
    "/favorite/:path*",
    "/upload/:path*",
    "/sudo/:path*",
  ],
  basePath: "/api/auth",
};
