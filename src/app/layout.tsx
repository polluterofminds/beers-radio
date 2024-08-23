import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beers Radio",
  description: "The best craft beer podcasts, all in one spot",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'    
  },
  openGraph: {
    title: "Beers Radio",
    description: "The best craft beer podcasts, all in one spot",    
    siteName: 'Beers Radio',
    images: [
      {
        url: 'https://readcast.mypinata.cloud/ipfs/QmSBXQoF2pX85J8KhrFizPVTRwNznxZhHa6YMD4bwr11sH', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://readcast.mypinata.cloud/ipfs/QmSBXQoF2pX85J8KhrFizPVTRwNznxZhHa6YMD4bwr11sH', // Must be an absolute URL
        width: 1800,
        height: 1600,
      },
    ],    
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <GoogleAnalytics gaId="G-3FMQSRF13T" />
      </body>
    </html>
  );
}
