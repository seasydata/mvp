// Generated by ChatGPT

import React from "react";

interface BodyTextProps {
  children?: React.ReactNode;
  className?: string;
}

const BodyText: React.FC<BodyTextProps> = ({ children, className = "" }) => {
  return (
    <p className={`font-roboto text-[#0A1A44] ${className}`}>{children}</p>
  );
};

export default BodyText;
