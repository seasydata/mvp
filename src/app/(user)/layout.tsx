'use client'
import Header from '~/components/header';
import Footer from '~/components/footer';

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    
    return (<>
    <Header/>
                <main className="w-4/5 mx-auto" style={{ height: 'calc(100vh - 6rem)' }}>
                    {children}
                </main>
    <Footer/>
    </>
                
    );
}