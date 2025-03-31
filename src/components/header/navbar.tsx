"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
//import { Button } from "@mui/material";
import CustomButton from "../styles/custom-button";
import { useRouter } from "next/navigation";
//import { FaGlobe } from "react-icons/fa";
import DropdownMenu from "./dropdown-menu";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="w-full h-[137px] bg-[#FBFBFB] shadow-none fixed z-50 sm:px-8 md:px-16 px-24">
      <div className="mx-auto flex items-center justify-between h-full">
        <div>
          <Link href={"/"}>
            <Image
              src={"/images/seasy-blue.png"}
              alt={"Seasy Data logo"}
              height={150}
              width={150}
              className="transition-transform duration-300 hover:scale-110 hover:brightness-110"
            />
          </Link>
        </div>
        <div className="sm:hidden flex gap-8 lg:ml-6 text-[#0A1A44] font-bold tracking-[0.2em] uppercase">
          <CustomButton className="uppercase" onClick={() => router.push("/")}>
            Home
          </CustomButton>

          <CustomButton
            className="uppercase"
            onClick={() => router.push("/about")}
          >
            About us
          </CustomButton>
          {/* 
<CustomButton
  className="uppercase"
  onClick={() => router.push("/contact-us")}
>
  Contact information
</CustomButton> 
*/}
        </div>

        <div className="flex items-center gap-6">
          <div className="md-and-up:hidden">
            <DropdownMenu
              title="Menu"
              menuItems={[
                { label: "Home", path: "/" },
                /*{ label: "Product", path: "/contact-us" },*/
                { label: "About us", path: "/about" },
                /*{ label: "Contact information", path: "/contact-us" },*/
                /* {
                  label: "",
                  onClick: () => console.log("Change language"),
                  icon: <FaGlobe className="mr-2" size={20} />,
                },*/
              ]}
            />
          </div>
          {/*<Button className="md-and-down:hidden flex items-center px-4 py-2 border border-[#0A1A44] rounded-md text-[#0A1A44] hover:bg-[#36f1cd]">
            <FaGlobe className="mr-2" size={24} />
          </Button>*/}
          <SignedOut>
            <SignInButton>
              <CustomButton
                variant="login"
                className="md-and-down:hidden uppercase"
              >
                Login
              </CustomButton>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <CustomButton
              variant="outlined"
              className="md-and-down:hidden"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </CustomButton>
            <SignOutButton>
              <CustomButton
                variant="outlined"
                className="md-and-down:hidden uppercase"
              >
                Sign out
              </CustomButton>
            </SignOutButton>
            <UserButton />
          </SignedIn>

          <CustomButton
            variant="outlined"
            className="md-and-down:hidden uppercase"
          >
            Book demo
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
