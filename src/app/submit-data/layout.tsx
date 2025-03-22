"use client";

import SubmissionHeader from "~/components/submissionheader";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SubmissionHeader />
      <main className="w-4/5 mx-auto" style={{ height: "calc(100vh - 6rem)" }}>
        {children}
      </main>
    </>
  );
}
