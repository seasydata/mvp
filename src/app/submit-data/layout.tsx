'use client'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

import SubmissionHeader from '~/components/submissionheader';

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    
    return (<>
    <SubmissionHeader/>
                <main className="w-4/5 mx-auto" style={{ height: 'calc(100vh - 6rem)' }}>
                    {children}
                </main>
    </>
                
    );
}