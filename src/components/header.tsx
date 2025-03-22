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

export default function Header() {
  return (
    <header className="flex justify-center h-24 bg-neutral-200">
      <div className="flex justify-between items-center w-4/5">
        <div className="flex mr-auto">
          <Link href={"/"}>
            <Image
              width="96"
              height="32"
              src="/images/logo.png"
              alt="Seasy Data Logo"
            />
          </Link>
        </div>
        <ClerkProvider>
          <SignedIn>
            <div className="flex mx-auto items-center justify-between gap-16">
              <Link
                href="/dashboard"
                className="text-1xl font-sans font-semibold text-cyan-950"
              >
                DASHBOARD
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex mx-auto items-center justify-between gap-16">
              <Link
                href="/dashboard"
                className="text-1xl font-sans font-semibold text-cyan-950"
              >
                ABOUT US
              </Link>
              <Link
                href="/dashboard"
                className="text-1xl font-sans font-semibold text-cyan-950"
              >
                NEWS AND ARTICLES
              </Link>
            </div>
          </SignedOut>

          <div className="flex ml-auto gap-4">
            <SignedOut>
              <SignInButton>
                <Button
                  className="bg-transparent border-4 border-slate-300 hover:bg-slate-300 text-slate-700 font-sans rounded-none"
                  size="lg"
                >
                  LOGIN
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="lg">Sign up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </ClerkProvider>
      </div>
    </header>
  );
}
