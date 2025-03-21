"use client"
import { useState } from "react";
import { X } from "lucide-react";
import BodyText from "../styles/body-text";

const DevBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#36F1CD] text-black text-sm py-2 px-4 flex justify-between items-center fixed top-[137px] w-full shadow-md z-40">
      <span>
        <BodyText className="font-normal text-[12px] leading-[12px] tracking-[0.2em] uppercase">
          Hello! Our website is under construction. changes are happening, stay
          tuned!
        </BodyText>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-yellow-600 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  );
};
export default DevBanner;
