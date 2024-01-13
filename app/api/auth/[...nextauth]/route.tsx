import NextAuth from "next-auth";
import AuthConfig from "@/app/configs/AuthConfig";

const handler = NextAuth(AuthConfig);

export { handler as GET, handler as POST };
