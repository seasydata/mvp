"use server";

// src/App.tsx
import React from "react";

import HeroSection from "~/components/hero-section";
import AboutSection from "~/components/about-section";
import ContactUsSection from "~/components/contact-us-section";
import ContributionSection from "~/components/contribution-section";
import PartnersSection from "~/components/partners-section";

export default async function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-white">
      {/* Main Content */}
      <main className="flex-grow py-12 w-[85%]">
        <HeroSection />
        <AboutSection />
        <ContributionSection />
        <PartnersSection />
        <ContactUsSection />
      </main>
    </div>
  );
}
