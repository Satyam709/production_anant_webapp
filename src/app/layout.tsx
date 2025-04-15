import type { Metadata } from "next";
import "@/styles/globals.css";
import Provider from "@/lib/Providers/Provider";
import authOptions from "@/lib/NextAuth/authOptions";
import { getServerSession } from "next-auth";
import {Martel} from "next/font/google";
export const metadata: Metadata = {
  title: "Anant: Next App",
  description: "Anant Next.js App",
};

const martel = Martel({
  subsets: ["devanagari"],
  weight: ["200","300","400","600","700","800","900"],
  variable: "--font-martel",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${martel.variable}`}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
