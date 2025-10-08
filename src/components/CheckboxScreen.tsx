import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";
import { SeasonalityBanner } from "./SeasonalityBanner";

interface CheckboxScreenProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

export const CheckboxScreen: React.FC<CheckboxScreenProps> = ({
  onNext,
  onBack,
  onClose,
}) => {
  const [options, setOptions] = useState<CheckboxOption[]>([
    { id: "right-front-door", label: "Right front door", checked: false },
    { id: "left-front-door", label: "Left front door", checked: false },
    { id: "right-rear-door", label: "Right rear door", checked: false },
    { id: "left-rear-door", label: "Left rear door", checked: false },
    { id: "front-bumper", label: "Front bumper", checked: false },
    { id: "right-front-fender", label: "Right front fender", checked: false },
    { id: "left-front-fender", label: "Left front fender", checked: false },
    { id: "right-rear-fender", label: "Right rear fender", checked: false },
    { id: "left-rear-fender", label: "Left rear fender", checked: false },
    { id: "ceiling", label: "Ceiling", checked: false },
    { id: "luggage", label: "Luggage", checked: false },
    { id: "side-skirt", label: "Side skirt", checked: false },
  ]);

  const toggleOption = (id: string) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const handleNext = () => {
    console.log(
      "Selected options:",
      options.filter((option) => option.checked)
    );
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const CheckedIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#2CB34F" />
      <path
        d="M10.5 16.0711L6.42893 12L7.84315 10.5858L10.5 13.2426L16.1569 7.58578L17.5711 9L10.5 16.0711Z"
        fill="white"
      />
    </svg>
  );

  const ProgressBar = ({ value, max }: { value: number; max: number }) => (
    <div className="w-40 h-1 bg-[#c6f1d1] rounded-lg overflow-hidden">
      <div
        className="h-full bg-[#2cb34f] rounded-l-lg"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header
        title="House painting"
        onBackClick={handleBackClick}
        onCloseClick={handleCloseClick}
      />

      {/* Progress Bar */}
      <div className="flex justify-center py-1 bg-white">
        <ProgressBar value={60} max={100} />
      </div>

      {/* Price Range */}
      <div className="bg-white border-b border-[#e3e5e8]">
        <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />
      </div>

      {/* Seasonality Banner */}
      <SeasonalityBanner />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24">
        {/* Question */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11]">
            Where are the dents on the vehicle?
          </h2>
        </div>

        {/* Checkbox List */}
        <div className="px-6">
          <div className="space-y-5">
            {options.map((option) => (
              <button
                key={option.id}
                className="flex items-center w-full"
                onClick={() => toggleOption(option.id)}
              >
                <div className="mr-2">
                  {option.checked ? (
                    <CheckedIcon />
                  ) : (
                    <div className="w-6 h-6 border border-[#b8c0ca] rounded flex items-center justify-center bg-white" />
                  )}
                </div>
                <span className="text-[16px] text-[#0e0f11]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <CTA onClick={handleNext}>Next</CTA>

      {/* Home indicator */}
      <div className="h-[34px] flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full" />
      </div>
    </div>
  );
};
