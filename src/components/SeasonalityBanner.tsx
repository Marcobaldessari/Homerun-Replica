import React from "react";

export const SeasonalityBanner: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-[#0e0f11] px-6 py-2">
      <p className="text-[#f0f1f2] text-sm">
        This service is 17% cheaper in February!
      </p>
      <div className="p-3">
        <img
          src="/8dc1cb8224fe58f25816f561467043cceb7d3cf9.svg"
          alt="Info"
          className="w-4 h-4"
        />
      </div>
    </div>
  );
};

