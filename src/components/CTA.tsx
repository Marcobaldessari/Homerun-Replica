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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e3e5e8] z-10 flex justify-center">
      <div className="w-full max-w-md p-6">
        <button
          type="button"
          onClick={onClick}
          className={`w-full py-3 px-6 bg-[#2cb34f] text-white font-semibold rounded-lg text-base transition-colors hover:bg-[#259a44] focus:outline-none focus:ring-2 focus:ring-[#2cb34f] focus:ring-opacity-50 ${className}`}
        >
          {children}
        </button>
      </div>
    </div>
  );
};
