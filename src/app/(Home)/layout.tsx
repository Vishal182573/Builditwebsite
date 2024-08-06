import NavbarWithoutDark from "@/components/NavbarWithoutdark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <NavbarWithoutDark/>
        {children}
        </main>
    </>
  );
}