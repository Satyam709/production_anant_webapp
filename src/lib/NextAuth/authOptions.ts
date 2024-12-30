import prisma from "@/lib/PrismaClient/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

// configurations for the NextAuth
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rollNo: { label: "Roll No", type: "text", placeholder: "123108031" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const rollNo = credentials?.rollNo?.trim();
        const password = credentials?.password?.trim();

        if (!rollNo || !password) {
          return null;
        }

        const gotUser = await prisma.user.findUnique({
          where: { roll_number: Number(rollNo) },
        });

        if (!gotUser) {
          return null;
        }

        const validPassword = await bcryptjs.compare(
          password,
          gotUser.password
        );

        if (!validPassword) {
          return null;
        }

        // Return a user object in the expected format
        return {
          id: gotUser.id,
          rollNo: String(gotUser.roll_number),
          name: gotUser.name || null,
          image: gotUser.imageURL || null,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      baseUrl = "/";
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.user.id,
          token: token,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, rollNo: user.rollNo };
        token.picture = user.image;
      }
      return token;
    },
  },
};
export default authOptions;
