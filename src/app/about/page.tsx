import React from "react";
import Navbar from "../../components/header/navbar";
import Footer from "../../components/footer";
import WelcomeHeader from "~/components/styles/welcome-header";
import Content1 from "~/components/about/content1";
import Content2 from "~/components/about/content2";
import Content3 from "~/components/about/content3";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
      <main className="flex-grow py-12 w-[85%]">
        <WelcomeHeader text1={"Meet"} text2={"our team"} />
        <Content1 />
        <Content2 />
        <Content3 />
      </main>
    </div>
  );
}
