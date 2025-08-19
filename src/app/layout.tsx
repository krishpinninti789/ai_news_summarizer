import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick weights you need
  variable: "--font-plus-jakarta-sans",
});


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
        <Suspense>
          <body className={plusJakartaSans.variable}>
            {children}
            <SpeedInsights />
          </body>
        </Suspense>
      </html>
      <Footer />
    </ClerkProvider>
  );
}
