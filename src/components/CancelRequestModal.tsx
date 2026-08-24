import React, { useState } from "react";
import { CTA } from "./CTA";

export interface CancelReason {
  id: string;
  label: string;
}

export interface CancelRequestModalProps {
  onConfirm: (reasonId: string, otherText?: string) => void;
  onClose: () => void;
}

// Matches the "Delete Request" bottom sheet (Figma node 4750:13889), including the
// mandatory open-text-field behavior shown in the "Other" variant (node 4750:14134).
const CANCEL_REASONS: CancelReason[] = [
  { id: "offer-outside", label: "Agreed with an offer outside this website" },
  { id: "rates-too-high", label: "The rates are too high" },
  { id: "quality", label: "Not sure about the quality" },
  { id: "not-enough-offers", label: "Not enough offers" },
  { id: "no-answers", label: "Couldn't get answers to my queries" },
  { id: "no-longer-needed", label: "I no longer require this service" },
  { id: "other", label: "Other" },
];

const OTHER_REASON_ID = "other";

/**
 * Bottom-sheet asking why the consumer wants to cancel their request.
 * Follows the scrim + sheet overlay mechanics used by ExitConfirmationModal.
 *
 * The parent controls visibility by conditionally rendering this component.
 */
export const CancelRequestModal: React.FC<CancelRequestModalProps> = ({
  onConfirm,
  onClose,
}) => {
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(
    null
  );
  const [otherText, setOtherText] = useState("");
  const [showOtherError, setShowOtherError] = useState(false);

  const handleSelectReason = (reasonId: string) => {
    setSelectedReasonId(reasonId);
    if (reasonId !== OTHER_REASON_ID) {
      setShowOtherError(false);
    }
  };

  const handleOtherTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOtherText(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowOtherError(false);
    }
  };

  const handleConfirmClick = () => {
    if (!selectedReasonId) return;

    if (selectedReasonId === OTHER_REASON_ID && otherText.trim().length === 0) {
      setShowOtherError(true);
      return;
    }

    onConfirm(
      selectedReasonId,
      selectedReasonId === OTHER_REASON_ID ? otherText.trim() : undefined
    );
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

        {/* Bottom sheet */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-stretch pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-request-title"
            className="pointer-events-auto bg-white rounded-t-lg flex flex-col max-h-[90vh]"
          >
            <div className="overflow-y-auto pb-6">
              {/* Header */}
              <div className="flex items-start justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="text-[#0e0f11] text-xl leading-none hover:text-[#3a3f46]"
                >
                  ✕
                </button>
              </div>
              <div className="px-6 pb-2">
                <h2
                  id="cancel-request-title"
                  className="font-['Figtree'] font-semibold text-[28px] leading-[34px] text-[#0e0f11]"
                >
                  Why do you want to cancel your request?
                </h2>
              </div>

              {/* Reasons list */}
              <div className="flex flex-col items-start gap-6 px-6 pt-4">
                {CANCEL_REASONS.map((reason) => {
                  const isSelected = selectedReasonId === reason.id;
                  return (
                    <button
                      key={reason.id}
                      type="button"
                      onClick={() => handleSelectReason(reason.id)}
                      className="flex items-start gap-2 w-full text-left"
                    >
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border ${
                            isSelected ? "border-[#2cb34f]" : "border-[#b8c0ca]"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2cb34f]" />
                          )}
                        </div>
                      </div>
                      <span className="font-['Figtree'] font-normal text-[16px] leading-6 text-[#0e0f11]">
                        {reason.label}
                      </span>
                    </button>
                  );
                })}

                {/* Mandatory open text field, shown when "Other" is selected */}
                {selectedReasonId === OTHER_REASON_ID && (
                  <div className="flex flex-col gap-2 w-full -mt-2">
                    <textarea
                      value={otherText}
                      onChange={handleOtherTextChange}
                      placeholder="Write your cancellation reason"
                      rows={4}
                      className={`w-full p-4 border rounded-lg resize-none focus:outline-none text-base font-['Figtree'] text-[#0e0f11] placeholder:text-[#b8c0ca] ${
                        showOtherError ? "border-[#d71d36]" : "border-[#b8c0ca]"
                      }`}
                    />
                    {showOtherError && (
                      <div className="flex items-start gap-1">
                        <img
                          src="/icons/AlertCircleFull.svg"
                          alt=""
                          className="w-4 h-4 mt-[3px] flex-shrink-0"
                        />
                        <p className="font-['Figtree'] font-semibold text-[14px] leading-[22px] text-[#d71d36]">
                          Required field
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <CTA onClick={handleConfirmClick} disabled={!selectedReasonId}>
              Cancel request
            </CTA>
            {/* Spacer so content isn't hidden behind the fixed CTA */}
            <div className="h-24 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelRequestModal;
