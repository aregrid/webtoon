import Layout from "@/components/layouts/Layout"
import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github.css"; // You can choose a different style

export const metadata: Metadata = {
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
    <Layout>
      {children}
    </Layout>
  );
}
