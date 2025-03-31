import Footer from "~/components/footer";
import DevBanner from "~/components/header/dev-banner";
import Navbar from "~/components/header/navbar";

export default function publicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (<>
            <Navbar />
            <DevBanner />
            <main className="lg-and-up:py-12 pb-12">
                {children}
            </main>
            <Footer />
        </>
    );
}