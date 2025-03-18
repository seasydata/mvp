import React from "react";
import Navbar from "../components/header/navbar";
import Footer from "../components/footer";
import WelcomeHeader from "~/app/components/styles/welcome-header";
import Content1 from "~/app/components/contact-us/content1";

// NOTE: currently not in use!

export default function ContactUs() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">

      <main className="flex-grow py-12 w-[80%]">
        <WelcomeHeader text1={"Contact"} text2={"Information"} /> 
        <Content1 />
      </main>
    </div>
  );
}
