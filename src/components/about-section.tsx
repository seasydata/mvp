import CustomButton from "./styles/custom-button";
import Image from "next/image";
import Heading from "./styles/heading";
import BodyText from "./styles/body-text";

const AboutSection: React.FC = () => {
  const bodyTexts = [
    "Getting started with gathering scope 3 data from the value chain can be a pain in the ass.",
    "But don’t worry, we’ll guide you through it!",
    "Seasy Data helps you prep, reach out to suppliers, and we ensure you we will keep them happy. We make data collection easier for both you and your suppliers.",
    "Feel free to contact us for a meeting or a demo.",
  ];

  const buttons: {
    label: string;
    variant: "login" | "outlined" | "default";
    className?: string;
  }[] = [
    { label: "Send e-mail", variant: "login", className: "uppercase" },
    { label: "Book demo", variant: "outlined", className: "uppercase" },
  ];

  return (
    <section className="w-full flex flex-col lg-and-up:flex-row justify-center bg-[#FBFBFB] my-20 lg:my-40 h-auto">
      <div className="w-full lg-and-up:w-1/2 p-6 flex items-center">
        <Image
          src="/images/hikers.jpg"
          alt="Hikers on a mountain"
          width={407}
          height={598}
          className="w-full md:h-[400px] sm:h-[200px] object-cover max-h-[598px]"
        />
      </div>
      <div className="w-full lg-and-up:w-1/2 flex flex-col justify-center px-28 sm:px-2 md:px-16">
        <Heading className="pb-8 md:pb-4 pt-4 sm:pb-2 md:text-[48px] sm:text-[28px]">
          About
        </Heading>

        {bodyTexts.map((text, index) => (
          <BodyText
            key={index}
            className={`font-roboto font-light text-[16px] leading-[25px] tracking-normal ${
              index === 1 ? "mb-2" : "mb-8 md:mb-4 sm:mb-0"
            }`}
          >
            {text}
          </BodyText>
        ))}

        <div className="flex justify-start space-x-8 py-2">
          {buttons.map((btn, index) => (
            <CustomButton
              key={index}
              variant={btn.variant}
              className={btn.className}
            >
              {btn.label}
            </CustomButton>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
