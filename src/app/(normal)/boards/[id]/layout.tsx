import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ボード',
  description: "ボード",
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