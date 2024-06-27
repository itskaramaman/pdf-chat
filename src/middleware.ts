import middleware from "next-auth/middleware";

export const config = {
  matcher: ["/pricing", "/dashboard"],
};

export default middleware;
