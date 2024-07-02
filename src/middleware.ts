import middleware from "next-auth/middleware";

export const config = {
  matcher: ["/pricing", "/dashboard", "/dashboard/:id*"],
};

export default middleware;
