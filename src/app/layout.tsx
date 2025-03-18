"use client";

import { trpc } from "../server/api/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { TRPCProvider } from "@trpc/react-query/shared";


import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import Link from 'next/link'
import Image from 'next/image'

import { Button } from "../components/ui/button"
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

import SuperJSON from "superjson";
import "~/styles/globals.css";
import Footer from "./components/footer";
import Navbar from "./components/header/navbar";
import DevBanner from "./components/header/dev-banner";

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <Navbar />
              <DevBanner />
              <main className="w-4/5 mx-auto">
                {children}
              </main>
              <Footer />
            </body>
          </html>
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider >
  );
}