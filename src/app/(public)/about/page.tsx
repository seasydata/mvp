import React from "react";
import WelcomeHeader from "~/components/styles/welcome-header";
import TeamImage from "~/components/about/team-image";
import TeamInfo from "~/components/about/team-info";
import TeamPictures from "~/components/about/team-pictures";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col md-and-down:pt-20 pt-40 items-center bg-white">
      <main className="flex-grow py-12 w-[85%]">
        <WelcomeHeader text1={"Meet"} text2={"our team"} />
        <TeamImage />
        <TeamInfo />
        <TeamPictures />
      </main>
    </div>
  );
}
