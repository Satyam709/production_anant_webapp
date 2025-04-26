import type { Metadata } from "next";
import "@/styles/globals.css";
import Provider from "@/lib/Providers/Provider";
import authOptions from "@/lib/NextAuth/authOptions";
import { getServerSession } from "next-auth";
import {Martel} from "next/font/google";
export const metadata: Metadata = {
  title: "Anant: Next App",
  description: "Anant Next.js App",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "manifest", url: "/site.webmanifest" }, 
  ],
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
