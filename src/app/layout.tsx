import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { getUrl } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getUrl()),
  title: {
    default: "Code Snippet Generator | Create Beautiful Code Snippets",
    template: "%s | Code Snippet Generator",
  },
  description:
    "Generate beautiful code snippets with syntax highlighting for over 30 programming languages. Perfect for documentation, code sharing, and teaching.",
  keywords: [
    "code generator",
    "snippet",
    "syntax highlighting",
    "code formatting",
    "developer",
    "programming",
    "development tool",
  ],
  authors: [{ name: "Sébastien TIMONER" }],
  creator: "Sébastien TIMONER",
  publisher: "Sébastien TIMONER",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: getUrl(),
    languages: {
      "en-US": getUrl(),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    siteName: "Code Snippet Generator",
    title: "Code Snippet Generator | Create Beautiful Code Snippets",
    description:
      "Generate beautiful code snippets with syntax highlighting for over 30 programming languages.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Snippet Generator",
    description: "Generate beautiful code snippets with syntax highlighting",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#9ec33a",
      },
    ],
  },
  themeColor: "#9ec33a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Code Snippet Generator",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
