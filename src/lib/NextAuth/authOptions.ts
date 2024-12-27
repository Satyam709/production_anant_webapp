import prisma from "@/lib/PrismaClient/db";
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

// configurations for the NextAuth
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rollNo: { label: "Roll No", type: "text", placeholder: "123108031" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        let rollNo = credentials?.rollNo;
        let password = credentials?.password;

        if (!rollNo || !password) {
          return null;
        }

        rollNo = rollNo.trim();
        password = password.trim();

        const user = await prisma.user.findUnique({
            where: { roll_number: Number(rollNo) },
        });

        if (!user) {
            return null;
        }
        return user;
      },
    }),
  ],
};
export default authOptions;
