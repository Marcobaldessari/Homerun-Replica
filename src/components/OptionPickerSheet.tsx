import React from "react";

export interface OptionPickerSheetProps {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  onClose: () => void;
}

// Generic single-select bottom sheet, following the scrim + rounded-top-sheet
// mechanics used by CancelRequestModal/ExitConfirmationModal. Selecting a row
// applies it and dismisses immediately — there's no separate confirm step,
// matching how the country/location pickers behave in the Figma flow.
export const OptionPickerSheet: React.FC<OptionPickerSheetProps> = ({
  title,
  options,
  selected,
  onSelect,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex justify-center">
      <div className="relative w-full max-w-md h-full">
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="absolute inset-0 w-full h-full bg-black/[0.28] cursor-default"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-stretch pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="option-picker-title"
            className="pointer-events-auto bg-white rounded-t-lg flex flex-col max-h-[70vh]"
          >
            <div className="flex items-start justify-end px-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-[#0e0f11] text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="px-6 pb-2">
              <h2 id="option-picker-title" className="text-xl font-semibold text-[#0e0f11]">
                {title}
              </h2>
            </div>

            <div className="overflow-y-auto pb-8">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className="w-full flex items-center justify-between text-left px-6 py-4"
                >
                  <span
                    className={`text-base ${
                      option === selected ? "font-semibold text-[#0e0f11]" : "text-[#292d33]"
                    }`}
                  >
                    {option}
                  </span>
                  {option === selected && (
                    <img src="/icons/Checkmark.svg" alt="" className="w-4 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
