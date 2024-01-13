export { default } from "next-auth/middleware";

// const middleware = () => {};

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"],
};
