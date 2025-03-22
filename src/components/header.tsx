import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
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

          {/* Desktop navigation - only visible on md and up */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <SignedOut>
              <nav className="flex items-center mr-8 space-x-6">
                <Link
                  href="/about"
                  className="text-base font-medium text-cyan-900 hover:text-cyan-700 py-2 px-3 rounded-md hover:bg-cyan-50 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/news"
                  className="text-base font-medium text-cyan-900 hover:text-cyan-700 py-2 px-3 rounded-md hover:bg-cyan-50 transition-colors"
                >
                  News & Articles
                </Link>
              </nav>
            </SignedOut>

            <div className="flex items-center pl-6 border-l border-gray-200">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="outline"
                    className="mr-3 border-cyan-700 text-cyan-800 hover:bg-cyan-50 hover:text-cyan-900"
                    size="sm"
                  >
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm" className="bg-cyan-700 hover:bg-cyan-800">
                    Sign up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>

          {/* Mobile controls - only visible on small screens */}
          <div className="flex items-center md:hidden">
            <SignedIn>
              <div className="mr-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2">
            <SignedIn>
              <nav className="flex flex-col space-y-2 py-3 px-2">
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-cyan-900 hover:text-cyan-700 py-2 px-3 rounded-md hover:bg-cyan-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </nav>
            </SignedIn>
            <SignedOut>
              <nav className="flex flex-col space-y-2 py-3 px-2">
                <Link
                  href="/about"
                  className="text-base font-medium text-cyan-900 hover:text-cyan-700 py-2 px-3 rounded-md hover:bg-cyan-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/news"
                  className="text-base font-medium text-cyan-900 hover:text-cyan-700 py-2 px-3 rounded-md hover:bg-cyan-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News & Articles
                </Link>
              </nav>

              <div className="flex flex-col space-y-3 px-5 py-4 border-t border-gray-100">
                <SignInButton>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-cyan-700 text-cyan-800 hover:bg-cyan-50 hover:text-cyan-900"
                    size="sm"
                  >
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="w-full justify-center bg-cyan-700 hover:bg-cyan-800"
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  );
}
