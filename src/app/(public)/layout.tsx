import Footer from "~/components/footer";
import DevBanner from "~/components/header/dev-banner";
import Navbar from "~/components/header/navbar";

export default function publicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (<>
            <Navbar />
            <DevBanner />
            <main className="w-4/5 mx-auto">
                {children}
            </main>
            <Footer />
        </>
    );
}