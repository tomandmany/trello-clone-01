// layout.tsx
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} w-full min-h-[100vh] max-h-[100vh] flex flex-col overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}