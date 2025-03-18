import React from "react";
import WelcomeHeader from "./styles/welcome-header";
import BodyText from "./styles/body-text";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-auto my-40 md:my-32 sm:my-24">
      <div className="h-[600px]">
        <WelcomeHeader
          text1={"Welcome"}
          text2="let&apos;s hunt emissions data"
          className="lg-and-up:pl-20"
        />
        <BodyText className="uppercase text-center text-[12px] leading-[12px] tracking-[0.2em] font-normal">
          we help you plan, request and collect emissions data from your value
          chain
        </BodyText>
      </div>
    </section>
  );
};
export default HeroSection;
