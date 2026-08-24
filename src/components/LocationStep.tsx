import React, { useMemo, useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { CTA } from "./CTA";

interface LocationStepProps {
  serviceName: string;
  progressValue: number;
  onNext: (address: string) => void;
  onBack: () => void;
  onClose: () => void;
}

// Static, local mock list of addresses used to power the typeahead.
// This is a prototype - no real geocoding/places API is called.
const MOCK_ADDRESSES: string[] = [
  "W2 SAA - Hyde Park Ward, City of Westminster, London",
  "W2 SAB - Hyde Park Ward, City of Westminster, London",
  "W2 SAD - Hyde Park Ward, City of Westminster, London",
  "W2 SAE - Hyde Park Ward, City of Westminster, London",
  "W1D 1BS - Soho, City of Westminster, London",
  "W1F 7EA - Fitzrovia, City of Westminster, London",
  "SW1A 1AA - Buckingham Palace, City of Westminster, London",
  "SW1A 2AA - Whitehall, City of Westminster, London",
  "E1 6AN - Whitechapel, Tower Hamlets, London",
  "N1 9GU - Islington, London",
  "NW1 5LR - Camden Town, London",
  "SE1 9GF - Southwark, London",
];

export const LocationStep: React.FC<LocationStepProps> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return MOCK_ADDRESSES.filter((address) =>
      address.toLowerCase().includes(trimmed)
    );
  }, [query]);

  const showSuggestions = query.trim().length > 0 && !selectedAddress;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (selectedAddress) setSelectedAddress(null);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedAddress(null);
  };

  const handleSelect = (address: string) => {
    setSelectedAddress(address);
    setQuery(address);
  };

  const handleNextClick = () => {
    if (selectedAddress) {
      onNext(selectedAddress);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header title={serviceName} onBackClick={onBack} onCloseClick={onClose} />

      {/* Progress Bar */}
      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={progressValue} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Where do you need the service?
          </h2>
          <p className="text-sm text-[#6a7482] mt-2">
            Search for your address so we can match you with local service
            providers.
          </p>
        </div>

        <div className="px-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full h-14 pl-4 pr-12 border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear address"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img src="/icons/ClearSearch.svg" alt="" className="w-6 h-6" />
              </button>
            )}
          </div>

          {showSuggestions && (
            <div className="mt-4">
              <p className="text-sm text-[#6a7482] mb-2">
                {suggestions.length > 0
                  ? "Select an option"
                  : "No matching addresses"}
              </p>
              {suggestions.length > 0 && (
                <div className="flex flex-col w-full">
                  {suggestions.map((address, index) => (
                    <React.Fragment key={address}>
                      <button
                        type="button"
                        onClick={() => handleSelect(address)}
                        className="w-full text-left py-4"
                      >
                        <span className="text-base text-[#0e0f11]">
                          {address}
                        </span>
                      </button>
                      {index < suggestions.length - 1 && (
                        <div className="h-px w-full bg-[#e3e5e8]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedAddress && (
            <div className="mt-4 flex items-start gap-2 bg-[#f9fafa] rounded-lg p-3">
              <img
                src="/icons/Checkmark.svg"
                alt=""
                className="w-4 h-3 mt-1 flex-shrink-0"
              />
              <span className="text-sm text-[#0e0f11]">
                {selectedAddress}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleNextClick} disabled={!selectedAddress}>
        Next
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
