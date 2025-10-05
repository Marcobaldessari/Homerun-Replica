import React from "react";

interface CTAProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CTA: React.FC<CTAProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <div className="mt-auto border-t border-[#e3e5e8] p-6">
      <button
        type="button"
        onClick={onClick}
        className={`w-full py-3 px-6 bg-[#2cb34f] text-white font-semibold rounded-lg text-base transition-colors hover:bg-[#259a44] focus:outline-none focus:ring-2 focus:ring-[#2cb34f] focus:ring-opacity-50 ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

