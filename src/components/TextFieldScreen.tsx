import React, { useState, useMemo, useCallback } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";
import { SeasonalityBanner } from "./SeasonalityBanner";

interface TextFieldScreenProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  serviceName?: string;
}

interface TextAreaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const { styles, validationMessage } = useMemo(() => {
    const charCount = value.length;
    let bg = "";
    let border = "border-[#b8c0ca]";
    let message: string | null = null;

    if (charCount === 0) {
      // Default styles already set
    } else if (charCount >= 1 && charCount <= 25) {
      bg = "bg-[#FEEEE8]";
      border = "border-[#E1590E]";
      message = "Write more details so that our service providers understand what you need!";
    } else if (charCount >= 26 && charCount <= 100) {
      bg = "bg-[#FEF8E9]";
      border = "border-[#F7BE2C]";
      message = "Is there anything missing?";
    } else if (charCount >= 101 && charCount <= 2000) {
      bg = "bg-[#E7FAC9]";
      border = "border-[#003B25]";
      message = "Thanks.";
    }

    return {
      styles: { bg, border },
      validationMessage: message,
    };
  }, [value.length]);

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

const ExamplesSection: React.FC = () => (
    <div className="bg-[#f9fafa] p-3 rounded-lg">
      <div className="flex items-start gap-1 mb-3">
        <img 
          src="/icons/LightBulb.svg" 
          alt="Lightbulb" 
          width="16" 
          height="16"
          className="flex-shrink-0"
        />
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

export const TextFieldScreen: React.FC<TextFieldScreenProps> = ({
  onNext,
  onBack,
  onClose,
  serviceName = "House painting",
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

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  }, []);

  return (
    <div className="relative w-full max-w-md flex flex-col min-h-screen">
      {/* Header */}
      <Header
        title={serviceName}
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
              What else should the service provider know/pay attention to?
            </h1>
          </div>

          <div className="px-6">
            <TextAreaInput
              value={notes}
              onChange={handleNotesChange}
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
