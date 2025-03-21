"use client";

import { trpc } from "../server/api/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import SuperJSON from "superjson";
import "~/styles/globals.css";
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({
        url: "/api/trpc",
        transformer: SuperJSON,

      })],
    }),
  );
  return (
    <ClerkProvider >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
              <main style={{ height: 'calc(100vh - 6rem)' }}>
                {children}
              </main>
            </body>
          </html>
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider >
  );
}