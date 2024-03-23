import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ワークスペース',
  description: "ワークスペース",
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