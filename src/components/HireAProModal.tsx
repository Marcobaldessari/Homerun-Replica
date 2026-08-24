import React, { useState } from "react";
import type { Quote } from "../data/jobs";
import { CTA } from "./CTA";

export interface HireAProModalProps {
  /** The pros to choose from. */
  quotes: Quote[];
  onConfirm: (quoteId: string) => void;
  onClose: () => void;
}

/**
 * "Hire a pro" bottom sheet (Figma node 4753:14319).
 *
 * Overlay mechanics follow the pattern established in ExitConfirmationModal.tsx
 * (fixed inset-0 scrim, inner column capped at the app's max-w-md mobile
 * viewport, z-[60] to sit above CTA/Header/BottomNavigation) — here rendered
 * as a near-full-height page sheet to match the Figma "Modal/Page sheet" frame.
 */
export const HireAProModal: React.FC<HireAProModalProps> = ({
  quotes,
  onConfirm,
  onClose,
}) => {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedQuoteId) return;
    onConfirm(selectedQuoteId);
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-center">
      {/* Column matching the app's max-w-md mobile viewport (see NavigationApp.tsx) */}
      <div className="relative w-full max-w-md h-full">
        {/* Scrim */}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="absolute inset-0 w-full h-full bg-black/[0.28] cursor-default"
        />

        {/* Sheet */}
        <div className="absolute inset-x-0 top-6 bottom-0 pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-a-pro-title"
            className="pointer-events-auto h-full w-full bg-white rounded-t-2xl flex flex-col overflow-hidden"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1 shrink-0">
              <div className="w-9 h-1 rounded-full bg-[#e3e5e8]" />
            </div>

            {/* Close button */}
            <div className="flex justify-end px-3 pt-1 shrink-0">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-gray-600 hover:text-gray-800 text-xl leading-none p-2"
              >
                ✕
              </button>
            </div>

            {/* Heading + description */}
            <div className="px-6 pb-4 shrink-0">
              <h2
                id="hire-a-pro-title"
                className="font-['Figtree'] font-semibold text-[28px] leading-[34px] text-[#0e0f11] mb-4"
              >
                Which pro did you hire?
              </h2>
              <p className="font-['Figtree'] text-sm leading-[22px] text-[#6a7482]">
                Select the pro you want to hire and confirm your choice.
              </p>
            </div>

            {/* Radio list */}
            <div className="flex-1 overflow-y-auto px-6 pb-28">
              {quotes.map((quote) => {
                const isSelected = quote.id === selectedQuoteId;
                return (
                  <label
                    key={quote.id}
                    className="flex items-center gap-2 py-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hire-a-pro"
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => setSelectedQuoteId(quote.id)}
                    />
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-[#2cb34f]" : "border-[#b8c0ca]"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-3 h-3 rounded-full bg-[#2cb34f]" />
                      )}
                    </span>
                    <span className="flex items-center gap-2 min-w-0">
                      <img
                        src={quote.avatarUrl}
                        alt={quote.proName}
                        className="w-10 h-10 rounded-full object-cover border border-[#e3e5e8] shrink-0"
                      />
                      <span className="text-sm font-semibold text-[#0e0f11] truncate">
                        {quote.proName}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <CTA onClick={handleConfirm} disabled={!selectedQuoteId}>
              Confirm
            </CTA>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireAProModal;
