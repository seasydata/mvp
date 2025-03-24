import Link from "next/link";
import Image from "next/image";

export default function SubmissionHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center">
              <Image
                width="110"
                height="36"
                src="/images/logo.png"
                alt="Seasy Data Logo"
                className="h-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
