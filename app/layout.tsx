import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./styles.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Portfolio Task Manager created by me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <Providers>
          {children}
          <div id="modals"></div>
        </Providers>
      </body>
    </html>
  );
}
