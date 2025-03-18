import React from "react";
import { Card, CardContent } from "@mui/material";
import Heading from "./styles/heading";
import Image from "next/image";

const partners = [
  {
    name: "Econnect Energy",
    src: "/images/econnect.svg",
    alt: "Econnect Energy Logo",
  },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="w-full mx-auto my-20">
      <Heading className="pb-8 pt-4">Our Partners</Heading>
      <Card
        className="w-full relative border-none h-auto py-24 md:py-12 bg-[#FBFBFB] flex sm:flex-col flex-wrap justify-center items-center gap-20 md:gap-10 rounded-none"
        elevation={0}
      >
        {partners.map((partner, index) => (
          <CardContent key={index} className={`flex justify-center`}>
            <Image
              src={partner.src}
              alt={partner.alt}
              width={350}
              height={350}
              style={{ objectFit: "contain" }}
              className="md:h-[180px] md:w-[180px]"
            />
          </CardContent>
        ))}
      </Card>
    </section>
  );
};
export default PartnersSection;
