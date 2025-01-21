// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the DefaultUser type
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session {
    user?: User;
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
  }
}
