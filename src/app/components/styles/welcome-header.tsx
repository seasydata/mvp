import React from "react";
import Heading from "./heading";
import SubHeading from "./sub-heading";

interface HeaderProps {
  children?: React.ReactNode; // Make `children` optional
  className?: string;
  text1: string;
  text2: string;
}

const WelcomeHeader: React.FC<HeaderProps> = ({
  children,
  text1,
  text2,
  className = "",
}) => {
  return (
    <section
      className={`relative w-full flex flex-col items-start ${className}`}
    >
      <div className="w-full text-left py-6 md:py-4">
        <Heading>{text1}</Heading>
        <SubHeading>{text2}</SubHeading>
      </div>
      {children && <div className="mt-4">{children}</div>}{" "}
      {/* Optional children */}
    </section>
  );
};

export default WelcomeHeader;
