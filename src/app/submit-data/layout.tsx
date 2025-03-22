"use client";

import SubmissionHeader from "~/components/submissionheader";
import Footer from "~/components/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SubmissionHeader />
      <main className="min-h-[calc(100vh-5rem)] flex flex-col justify-start">
        {children}
      </main>
      <Footer />
    </>
  );
}
