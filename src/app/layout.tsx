import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewsGist",
  description: "Stay informed with AI-powered news summaries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Header />
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#FFFFFF" />
        </head>

        <body className={inter.className}>{children}</body>
      </html>
      <Footer />
    </ClerkProvider>
  );
}
