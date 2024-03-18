import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import MenuBar from "@/components/MenuBar/MenuBar";
import SideMenu from "@/components/SideMenu/SideMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trelloクローン",
  description: "Trelloクローン",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} w-full min-h-[100vh] max-h-[100vh] flex flex-col overflow-hidden`}>
        <Header />
        <div className="relative">
          <MenuBar />
          <SideMenu />
        </div>
        {children}
      </body>
    </html>
  );
}
