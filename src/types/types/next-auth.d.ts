import { JWT } from "jsonwebtoken";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rollNo: string;
      name: string?;
      image: string?;
      token: JWT;
    };
  }
  interface User {
    id: string;
    rollNo: string;
    image: string?;
    name: string?;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      rollNo: string;
    };
  }
}
