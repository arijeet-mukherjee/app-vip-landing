import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "SecDesk | VIP",
  description: "Designed and Developed by CodeNebula"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../../micrologo.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
