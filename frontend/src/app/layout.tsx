import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZARAT GROUP ERP",
  description: "ZARAT GROUP — Vahid İdarəetmə Sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${geist.className} antialiased bg-gray-50 text-gray-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
