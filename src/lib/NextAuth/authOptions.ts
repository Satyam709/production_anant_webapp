import prisma from "@/lib/PrismaClient/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { rollNumberSchema } from "@/types/common";

// configurations for the NextAuth
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        rollNo: { label: "Roll No", type: "text", placeholder: "123108031" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let rollNo = credentials?.rollNo?.trim();
        const password = credentials?.password?.trim();

        const result = rollNumberSchema.safeParse(rollNo);

        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }

        rollNo = result.data;

        if (!rollNo || !password) {
           throw new Error("RollNo and Password is required");;
        }

        let gotUser;
        try {
          gotUser = await prisma.user.findUnique({
            where: { roll_number: Number(rollNo) },
          });
        } catch (error) {
          console.log("error while sigin : ",error);          
          throw new Error("Something went wrong");  
        }
        

        if (!gotUser) {
          throw new Error("User not found please register");
        }

        const validPassword = await bcryptjs.compare(
          password,
          gotUser.password
        );

        if (!validPassword) {
          throw new Error("Invalid Password");
        }

        // Return a user object in the expected format
        return {
          id: gotUser.id,
          rollNo: String(gotUser.roll_number),
          name: gotUser.name || null,
          image: gotUser.imageURL || null,
          position: gotUser.position || null,
          branch: gotUser.branch || null
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      url = baseUrl + "/dashboard"; // Adjusted to use correct baseUrl
      return url;
    },
    async session({ session, token}) {
      if (token) {
        session.user = {
          id: token.user.id,
          token: token,
          info: token.user,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.picture = user.image;
      }
      return token;
    },
  },
};
export default authOptions;
