import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ワークスペース一覧",
  description: "ワークスペース一覧",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} w-full min-h-[100vh] max-h-[100vh] flex flex-col overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
