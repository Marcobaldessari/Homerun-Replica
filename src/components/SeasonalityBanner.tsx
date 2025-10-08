import React from "react";

export const SeasonalityBanner: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-[#0e0f11] px-6 py-2">
      <p className="text-[#f0f1f2] text-sm">
        This service is 17% cheaper in February!
      </p>
      <div className="flex items-center justify-center">
        <img
          src="/icons/Info.svg"
          alt="Info"
          className="w-6 h-6 brightness-0 invert"
        />
      </div>
    </div>
  );
};
