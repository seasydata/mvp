"use client";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <main className="w-4/5 mx-auto pb-10 pt-5   ">{children}</main>
      <Footer />
    </div>
  );
}
