import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";
import { SeasonalityBanner } from "./SeasonalityBanner";

interface TextFieldScreenProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const TextFieldScreen: React.FC<TextFieldScreenProps> = ({
  onNext,
  onBack,
  onClose,
}) => {
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with notes:", notes);
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const TextAreaInput = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
  }) => {
    const getValidationStyles = () => {
      const charCount = value.length;
      if (charCount === 0) {
        return {
          bg: "",
          border: "border-[#b8c0ca]",
        };
      } else if (charCount >= 1 && charCount <= 25) {
        return {
          bg: "bg-[#FEEEE8]",
          border: "border-[#E1590E]",
        };
      } else if (charCount >= 26 && charCount <= 100) {
        return {
          bg: "bg-[#FEF8E9]",
          border: "border-[#F7BE2C]",
        };
      } else if (charCount >= 101 && charCount <= 2000) {
        return {
          bg: "bg-[#E7FAC9]",
          border: "border-[#003B25]",
        };
      }
      return {
        bg: "",
        border: "border-[#b8c0ca]",
      };
    };

    const getValidationMessage = () => {
      const charCount = value.length;
      if (charCount === 0) {
        return null;
      } else if (charCount >= 1 && charCount <= 25) {
        return "Write more details so that our service providers understand what you need!";
      } else if (charCount >= 26 && charCount <= 100) {
        return "Is there anything missing?";
      } else if (charCount >= 101 && charCount <= 2000) {
        return "Thanks.";
      }
      return null;
    };

    const styles = getValidationStyles();
    const validationMessage = getValidationMessage();

    return (
      <div className="w-full">
        <textarea
          className={`w-full h-48 p-4 border rounded-lg resize-none focus:outline-none ${styles.bg} ${styles.border} text-base transition-colors duration-300`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={2000}
        />
        <div className="mt-2 flex justify-between items-start">
          <div className="text-sm text-[#6a7482]">{validationMessage}</div>
          <div className="text-xs text-[#6a7482]">{value.length}/2000</div>
        </div>
      </div>
    );
  };

  const ExamplesSection = () => (
    <div className="bg-[#f9fafa] p-3 rounded-lg">
      <div className="flex items-start gap-1 mb-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99996 13.3333H9.99996C11.4727 13.3333 12.6666 12.1394 12.6666 10.6667V6.66667C12.6666 5.19391 11.4727 4 9.99996 4H5.99996C4.5272 4 3.33329 5.19391 3.33329 6.66667V10.6667C3.33329 12.1394 4.5272 13.3333 5.99996 13.3333Z"
            fill="#3A3F46"
            fillOpacity="0.2"
          />
          <path
            d="M6.66663 2C6.66663 1.63181 6.96844 1.33333 7.33329 1.33333H8.66663C9.03148 1.33333 9.33329 1.63181 9.33329 2V4H6.66663V2Z"
            fill="#3A3F46"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.33329 0C6.22872 0 5.33329 0.894772 5.33329 2V4C4.22872 4 3.33329 4.89477 3.33329 6V10.6667C3.33329 12.8758 5.12415 14.6667 7.33329 14.6667H8.66663C10.8758 14.6667 12.6666 12.8758 12.6666 10.6667V6C12.6666 4.89477 11.7712 4 10.6666 4V2C10.6666 0.894772 9.77139 0 8.66663 0H7.33329ZM6.66663 2C6.66663 1.63181 6.96844 1.33333 7.33329 1.33333H8.66663C9.03148 1.33333 9.33329 1.63181 9.33329 2V4H6.66663V2ZM5.99996 5.33333H9.99996C11.4727 5.33333 12.6666 6.52724 12.6666 8V10.6667C12.6666 12.1394 11.4727 13.3333 9.99996 13.3333H5.99996C4.5272 13.3333 3.33329 12.1394 3.33329 10.6667V8C3.33329 6.52724 4.5272 5.33333 5.99996 5.33333Z"
            fill="#3A3F46"
          />
        </svg>
        <span className="text-xs font-semibold text-[#3a3f46]">Examples</span>
      </div>
      <ul className="space-y-2">
        {[
          "The living room has water damage on the ceiling that needs repair before painting.",
          "Please use low-odor paint as I have allergies. I prefer satin finish in the bathroom.",
          "The back door lock is tricky - call me 10 minutes before arrival so I can let you in.",
        ].map((item, index) => (
          <li key={index} className="flex gap-1">
            <div className="flex-shrink-0 pt-1">
              <div className="w-[3px] h-[3px] bg-[#3a3f46] rounded-full"></div>
            </div>
            <span className="text-xs text-[#3a3f46]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="relative w-full max-w-md flex flex-col min-h-screen">
      {/* Header */}
      <Header
        title="House painting"
        onBackClick={handleBackClick}
        onCloseClick={handleCloseClick}
      />

      <div className="flex flex-col flex-grow">
        <div className="flex justify-center py-1 bg-white">
          <ProgressBar value={90} />
        </div>

        <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />

        {/* Seasonality Banner */}
        <SeasonalityBanner />

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow pb-24">
          <div className="px-6 pt-6 pb-4">
            <h1 className="text-xl font-semibold text-[#0e0f11] leading-7">
              What else should the painter know/pay attention to?
            </h1>
          </div>

          <div className="px-6">
            <TextAreaInput
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write more details"
            />
          </div>

          <div className="px-6 pt-4">
            <ExamplesSection />
          </div>
        </form>

        <CTA onClick={() => handleSubmit({} as React.FormEvent)}>Next</CTA>
      </div>

      {/* Home indicator */}
      <div className="h-[34px] w-full flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full" />
      </div>
    </div>
  );
};
