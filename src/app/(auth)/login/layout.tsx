// layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
  description: "ログインページ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}