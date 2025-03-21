import React from "react";
import WelcomeHeader from "~/components/styles/welcome-header";
import Content1 from "~/components/contact-us/content1";

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
