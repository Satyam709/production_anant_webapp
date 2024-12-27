import type { Metadata } from "next";
import "@/styles/globals.css";
import Provider from "@/lib/Providers/Provider";
import authOptions from "@/lib/NextAuth/authOptions";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Anant: Next App",
  description: "Anant Next.js App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
