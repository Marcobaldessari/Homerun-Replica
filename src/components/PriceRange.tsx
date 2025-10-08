import React from "react";

interface PriceRangeProps {
  minPrice: string;
  maxPrice: string;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
}) => {
  return (
    <div>
      <div className="flex justify-between px-6 py-2 text-sm">
        <span className="text-[#6a7482]">Average price range:</span>
        <span className="font-semibold text-[#6a7482]">
          {minPrice} - {maxPrice}
        </span>
      </div>
      <div className="h-px bg-[#e3e5e8] w-full shadow-sm"></div>
    </div>
  );
};
