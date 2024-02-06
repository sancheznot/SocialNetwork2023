export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/follow/:path*",
    "/favorite/:path*",
    "/categories/:path*",
    "/upload/:path*",
    "/profile/:path*",
    "/sudo/:path*",
  ],
  basePath: "/api/auth",
};
