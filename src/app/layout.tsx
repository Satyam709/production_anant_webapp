import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Martel } from 'next/font/google';
import { getServerSession } from 'next-auth';

import authOptions from '@/lib/NextAuth/authOptions';
import Provider from '@/lib/Providers/Provider';

export const metadata: Metadata = {
  title: 'Anant : The Mathematical Society of NIT Kurukshetra',
  description:
    'Welcome to Anant - The Mathematical Society. At Anant, our mission is to ignite and nurture a love for mathematics and technology. Encourage Mathematical Excellence: Inspire the exploration and understanding of math concepts through fun activities, workshops, and seminars. Promote Technological Innovation: Provide a platform for students to develop and showcase their tech skills through hackathons, coding competitions, and project displays.',

  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'manifest', url: '/site.webmanifest' },
  ],

  openGraph: {
    title: 'Anant : The Mathematical Society of NIT Kurukshetra',
    description:
      'Welcome to Anant - The Mathematical Society at NIT Kurukshetra. Join us to explore math and technology through workshops, competitions, and innovation platforms.',
    url: 'https://www.anantnitkkr.com',
    siteName: 'Anant NIT KKR',
    images: [
      {
        url: '/og-image.png', // Replace this with your actual OpenGraph image
        width: 1200,
        height: 630,
        alt: 'Anant - Mathematical Society',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Anant : The Mathematical Society of NIT Kurukshetra',
    description:
      'Official platform for Mathematical activities at NIT Kurukshetra.',
    images: ['/og-image.png'], // Replace with actual image path
  },
};

const martel = Martel({
  subsets: ['devanagari'],
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  variable: '--font-martel',
  display: 'swap',
});

import BranchGuard from '@/components/auth/BranchGuard';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${martel.variable}`}>
        <Provider session={session}>
          <BranchGuard>{children}</BranchGuard>
        </Provider>
      </body>
    </html>
  );
}
