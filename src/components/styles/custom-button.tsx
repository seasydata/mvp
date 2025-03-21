import * as React from "react";
// Made by ChatGPT
// Define the props interface.
// We extend React.ButtonHTMLAttributes to include all standard button props.
export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "login";
}

// Create the button component using forwardRef so that parent components can access the underlying <button> if needed.
const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    // Choose base classes based on the variant
    const baseClasses =
      variant === "outlined"
        ? "font-roboto font-normal w-[110px] h-[32px] tracking-[0.2em] py-2 text-[12px] leading-[12px] text-[#36f1cd] bg-[#0A1A44] font-bold border border-[#0A1A44] hover:border-[#36f1cd] hover:bg-[#36f1cd] hover:text-[#0A1A44] transition-colors duration-200"
        : variant === "login"
        ? "font-roboto font-normal w-[110px] h-[32px] text-[12px] leading-[12px] tracking-[0.2em] py-2 text-[#0A1A44] font-bold border border-[#0A1A44] hover:border-[#36f1cd] hover:bg-[#36f1cd] hover:text-[#0A1A44] transition-colors duration-200"
        : "font-roboto font-normal text-[12px] h-[32px] leading-[12px] tracking-[0.2em] text-[#0A1A44] hover:bg-[#36f1cd] transition-colors duration-200";

    return (
      <button
        ref={ref}
        // Combine the chosen base classes with any additional classes passed via the className prop.
        className={`${baseClasses} ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Set a display name to improve debugging and to show a proper name in React DevTools.
CustomButton.displayName = "CustomButton";

export default CustomButton;
