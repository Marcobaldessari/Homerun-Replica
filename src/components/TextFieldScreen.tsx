import React, { useState, useMemo, useCallback, useRef } from "react";
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
  onMediaAttach?: () => void;
  onVoiceDictation?: () => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  onChange,
  placeholder,
  onMediaAttach,
  onVoiceDictation,
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
      message =
        "Write more details so that our service providers understand what you need!";
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
      <div className="relative">
        <textarea
          className={`w-full h-48 p-4 pr-20 border rounded-lg resize-none focus:outline-none ${styles.bg} ${styles.border} text-base transition-colors duration-300`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={2000}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={onMediaAttach}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#e3e5e8] hover:bg-[#f9fafa] transition-colors shadow-sm"
            aria-label="Attach media"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 4.5L5.5 9.5C4.67157 10.3284 4.67157 11.6716 5.5 12.5C6.32843 13.3284 7.67157 13.3284 8.5 12.5L13.5 7.5C14.8807 6.11929 14.8807 3.88071 13.5 2.5C12.1193 1.11929 9.88071 1.11929 8.5 2.5L3.5 7.5"
                stroke="#3A3F46"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={onVoiceDictation}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#e3e5e8] hover:bg-[#f9fafa] transition-colors shadow-sm"
            aria-label="Voice dictation"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2C7.17157 2 6.5 2.67157 6.5 3.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V3.5C9.5 2.67157 8.82843 2 8 2Z"
                stroke="#3A3F46"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 7.5C4 9.433 5.567 11 7.5 11H8.5C10.433 11 12 9.433 12 7.5M8 9.5V13.5M6 13.5H10"
                stroke="#3A3F46"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value);
    },
    []
  );

  const handleMediaAttach = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        console.log("Files selected:", Array.from(files));
        // TODO: Handle file upload/processing
        // You can process the files here (upload to server, preview, etc.)
      }
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  const handleVoiceDictation = useCallback(() => {
    // TODO: Implement voice dictation functionality
    console.log("Voice dictation clicked");
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
              onMediaAttach={handleMediaAttach}
              onVoiceDictation={handleVoiceDictation}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,.pdf,.doc,.docx"
              multiple
              className="hidden"
              onChange={handleFileChange}
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
