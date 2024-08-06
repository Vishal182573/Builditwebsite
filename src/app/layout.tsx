import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuildIt",
  description:
    "A modern construction/inteior and realstate  company based in 10-2-289/83, Mehar Mansion, Shanti Nagar Colony, Masab Tank, Hyderabad, Telangana 500028 and people can contact us at +91 9652631186 and found latest properties,interior designs and construction services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
