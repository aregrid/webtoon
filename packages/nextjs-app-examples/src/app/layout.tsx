import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Twitter } from 'lucide-react';

import { Metadata as NextMetadata } from "next";

export const metadata: NextMetadata = {
  metadataBase: new URL(process.env.siteUrl || "https://platform.llamagen.ai/"),
  title: process.env.siteTitle,
  description: process.env.siteDescription,
  keywords: process.env.siteKeywords,
  icons: [
    {
      rel: "manifest",
      url: "/manifest.json",
    },
    {
      rel: "icon",
      url: "/icons/favicon.ico",
      type: "any",
    },
    {
      rel: "icon",
      url: "/icons/icon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      url: "/icons/icon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "apple-touch-icon",
      url: "/icons/apple-icon.png",
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <div className="container flex items-center justify-between  md:py-6 py-3 px-1 md:px-10">
          <div className="flex">
            <Link
              href="/"
              className="flex no-underline cursor-pointer space-x-2 max-sm:mr-0 items-center"
            >
              <Image
                alt="logo"
                width={32}
                height={32}
                className="object-contain"
                src={"/icons/light-logo-v3.jpg"}
              />
              <div className="flex md:flex-row md:items-center  relative   ">
                <Image
                  alt="logo"
                  width={256}
                  height={31}
                  className="md:w-32 w-28 object-contain"
                  src={"/icons/LlamaGen.Ai-word-white.png"}
                />
              </div>
            </Link>
          </div>
            {/* New navigation items */}
            <nav className="flex items-center space-x-8">
            <Link  target="_blank" href="https://github.com/aregrid/webtoon/blob/master/packages/nextjs-app-examples/src/components/examples/DigitalCampaign.tsx" className="text-white hover:text-gray-300 flex items-center space-x-2">
              <Github size={20} />
              <span>GitHub UI Examples</span>
            </Link>

            <Link  target="_blank" href="https://github.com/aregrid/webtoon/blob/master/packages/nextjs-app-examples/src/app/api/webtoon/route.ts" className="text-white hover:text-gray-300 flex items-center space-x-2">
              <Github size={20} />
              <span>GitHub API Examples</span>
            </Link>
            <Link href="https://llamagen.ai" target="_blank" className="text-white hover:text-gray-300 flex items-center space-x-2">
              <ExternalLink size={20} />
              <span>LlamaGen.AI App</span>
            </Link>
            <Link href="https://twitter.com/llama_gen"  target="_blank" className="text-white hover:text-gray-300 flex items-center space-x-2">
              <Twitter size={20} />
              <span>Twitter</span>
            </Link>
          </nav>
          
        </div>


        {children}
      </body>
    </html>
  );
}
