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
              <header className="flex justify-center h-24 bg-neutral-100">
                <div className='flex justify-between items-center w-4/5'>
                  <div className='flex mr-auto'>
                    <Link href={"/"}>
                      <Image width='96' height='32' src="/images/logo.png" alt="Seasy Data Logo" />
                    </Link>
                  </div>
                  <div className='flex mx-auto items-center justify-between gap-16'>
                    <Link href='/dashboard' className='text-1xl font-sans font-semibold text-cyan-950'>PRODUCT</Link>
                    <Link href='/dashboard' className='text-1xl font-sans font-semibold text-cyan-950'>ABOUT US</Link>
                    <Link href='/dashboard' className='text-1xl font-sans font-semibold text-cyan-950'>NEWS AND ARTICLES</Link>
                  </div>

                  <div className='flex ml-auto gap-4'>
                    <SignedOut>
                      <SignInButton>
                        <Button className='bg-transparent border-4 border-slate-300 hover:bg-slate-300 text-slate-700 font-sans rounded-none' size='lg'>LOGIN</Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button size='lg'>Sign up</Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      Hello
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
              </header>
              <main className="w-4/5 mx-auto">
                {children}
              </main>
              <footer>footer</footer>
            </body>
          </html>
        </QueryClientProvider>
        </trpc.Provider>
    </ClerkProvider >
  );
}