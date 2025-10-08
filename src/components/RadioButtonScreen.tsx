import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";
import { SeasonalityBanner } from "./SeasonalityBanner";

interface RadioButtonScreenProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const RadioButtonScreen: React.FC<RadioButtonScreenProps> = ({
  onNext,
  onBack,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleNextClick = () => {
    console.log("Selected size:", selectedSize);
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const SquareMeterSelector = () => {
    const options = [
      "20",
      "50",
      "60",
      "100",
      "120",
      "150",
      "180",
      "200",
      "300",
      "500",
    ];

    return (
      <div className="mb-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-2 mb-5 last:mb-0 cursor-pointer"
            onClick={() => handleSizeChange(option)}
          >
            <input
              type="radio"
              name="squareMeter"
              value={option}
              checked={selectedSize === option}
              onChange={() => handleSizeChange(option)}
              className="sr-only"
            />
            <div className="relative w-6 h-6 flex-shrink-0">
              <div
                className={`w-6 h-6 rounded-full border ${
                  selectedSize === option
                    ? "border-[#2cb34f]"
                    : "border-[#b8c0ca]"
                }`}
              >
                {selectedSize === option && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2cb34f]"></div>
                )}
              </div>
            </div>
            <span className="text-base text-[#0e0f11]">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header
        title="House painting"
        onBackClick={handleBackClick}
        onCloseClick={handleCloseClick}
        showBackButton={false}
      />

      {/* Progress Bar */}
      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={30} />
      </div>

      {/* Price Range */}
      <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />
      <div className="h-px bg-[#e3e5e8] w-full shadow-sm"></div>

      {/* Seasonality Banner */}
      <SeasonalityBanner />

      {/* Form Content */}
      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            How many square meters of room/house will be painted?
          </h2>
        </div>
        <div className="px-6">
          <SquareMeterSelector />
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleNextClick}>Next</CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
