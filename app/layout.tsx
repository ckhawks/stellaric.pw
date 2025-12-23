import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalStateMonitor } from "@/components/global-state-monitor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Stellaric • Developer & Creator",
  description:
    "Personal site of Stellaric - developer, modder, and multimedia creator",
  icons: {
    icon: [
      {
        url: "/stellaric_white.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/stellaric_black.ico",
        media: "(prefers-color-scheme: light)",
      },
      // {
      //   url: "/icon-dark-32x32.png",
      // },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalStateMonitor />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
