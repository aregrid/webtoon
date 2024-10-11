import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "highlight.js/styles/github.css"; // You can choose a different style

import Image from "next/image";
import Link from "next/link";
import { Github, Search, Menu, ChevronDown, Copy, BookOpen, Code, Layers, Bookmark, Layout, Server, ExternalLink, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Metadata as NextMetadata } from "next";
import { Toaster } from "sonner";
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
  const navItems = [
    { title: "Getting Started", icon: BookOpen, href: "/docs/overview" },
    // { title: "API Reference", icon: Code,href:"/docs/api-reference" },
    { title: "Examples", icon: Layers, href: "/docs/examples" },
    // { title: "Resources", icon: Bookmark,href:"/docs/resources" },
    { title: "UI Examples", icon: Layout, href: "https://github.com/aregrid/webtoon/blob/master/packages/nextjs-app-examples/src/components/examples/DigitalCampaign.tsx", external: true },
    { title: "API Examples", icon: Server, href: "https://github.com/aregrid/webtoon/blob/master/packages/nextjs-app-examples/src/app/api/webtoon/route.ts", external: true },
    { title: "LlamaGen.AI", icon: ExternalLink, href: "https://llamagen.ai", external: true },
    { title: "Twitter", icon: Twitter, href: "https://twitter.com/llama_gen", external: true },
  ];


  return (
    <html lang="en" >
      <body
        className={`antialiased `}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-50">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                alt="logo"
                width={32}
                height={32}
                className="object-contain"
                src={"/icons/light-logo-v3.jpg"}
              />
              <Image
                alt="logo"
                width={256}
                height={31}
                className="md:w-32 w-28 object-contain"
                src={"/icons/LlamaGen.Ai-word.png"}
              />
            </Link>
          </div>
          <nav className="flex items-center space-x-4 mr-8">
            <Button variant="ghost" asChild>
              <Link href="/">Docs</Link>
            </Button>
            {/* <Button variant="ghost">API reference</Button> */}
            <Button variant="ghost" asChild>
              <Link href="https://llamagen.ai/login" target="_blank">Log in</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="https://llamagen.ai/signup" target="_blank">Sign up</Link>
            </Button>
          </nav>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="fixed top-[73px] left-0 w-64 h-[calc(100vh-73px)] p-4 overflow-y-auto">
            <div className="mb-4">
              <Input type="search" placeholder="Search" className="w-full" />
            </div>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href || `/${item.title.toLowerCase().replace(' ', '-')}`} target={item.external ? "_blank" : undefined}>
                      <Button variant="ghost" className="w-full justify-start">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          {/* Main content */}
          <main className="flex-1 p-8 ml-64">
            {children}
          </main>
        </div>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
