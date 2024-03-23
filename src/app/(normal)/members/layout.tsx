import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メンバー一覧",
  description: "メンバー一覧",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
