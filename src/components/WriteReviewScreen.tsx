import React, { useState } from "react";
import type { Quote } from "../data/jobs";
import { CTA } from "./CTA";

export interface WriteReviewScreenProps {
  /** The pro being reviewed. */
  quote: Quote;
  onSubmit: (rating: number, feedback: string) => void;
  /**
   * Renders as a bottom sheet (see below), so this closes the sheet — wired the
   * same way ExitConfirmationModal/CancelRequestModal treat their "onClose"/"onExit"
   * callbacks. Named `onBack` to match the shared prop contract.
   */
  onBack: () => void;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

/**
 * Two-step "Write a review" bottom sheet (Figma node 10581:49838, instances
 * "Native - Write a review - Star rating" + "Native - Write a review - Review"):
 *  1. Star rating (1-5) for the pro, shown with their avatar and name.
 *  2. Written feedback, plus a "keep my review hidden" toggle.
 * `onSubmit(rating, feedback)` fires once both steps are complete.
 */
export const WriteReviewScreen: React.FC<WriteReviewScreenProps> = ({
  quote,
  onSubmit,
  onBack,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [keepHidden, setKeepHidden] = useState(false);

  const handleContinue = () => {
    if (rating === 0) return;
    setStep(2);
  };

  const handleSubmit = () => {
    onSubmit(rating, feedback.trim());
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-[60] flex justify-center">
      {/* Column matching the app's max-w-md mobile viewport (see NavigationApp.tsx) */}
      <div className="relative w-full max-w-md h-full">
        {/* Scrim */}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onBack}
          className="absolute inset-0 w-full h-full bg-black/[0.28] cursor-default"
        />

        {/* Bottom sheet */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-stretch pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            className="pointer-events-auto bg-white rounded-t-lg flex flex-col max-h-[90vh]"
          >
            <div className="overflow-y-auto pb-6">
              {/* Header */}
              <div className="flex items-start justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Close"
                  className="text-[#0e0f11] text-xl leading-none hover:text-[#3a3f46]"
                >
                  ✕
                </button>
              </div>

              {step === 1 ? (
                <>
                  <div className="px-6 pb-2">
                    <h2
                      id="write-review-title"
                      className="font-['Figtree'] font-semibold text-[28px] leading-[34px] text-[#0e0f11]"
                    >
                      How satisfied are you with the service you received?
                    </h2>
                  </div>
                  <div className="px-6 pb-6">
                    <p className="font-['Figtree'] font-normal text-[14px] leading-[22px] text-[#6a7482]">
                      Please select a rating from 1 to 5 stars.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6 px-6">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={quote.avatarUrl}
                        alt={quote.proName}
                        className="w-20 h-20 rounded-full object-cover border border-[#e3e5e8]"
                      />
                      <p className="font-['Figtree'] font-semibold text-[20px] leading-7 text-[#0e0f11] text-center">
                        {quote.proName}
                      </p>
                    </div>

                    <div
                      className="flex items-start gap-2"
                      role="radiogroup"
                      aria-label="Star rating"
                    >
                      {STAR_VALUES.map((value) => {
                        const isFilled = value <= displayRating;
                        return (
                          <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={value === rating}
                            aria-label={`${value} star${value > 1 ? "s" : ""}`}
                            onClick={() => setRating(value)}
                            onMouseEnter={() => setHoverRating(value)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="w-12 h-12 flex items-center justify-center"
                          >
                            <img
                              src={
                                isFilled
                                  ? "/icons/StarFilled.svg"
                                  : "/icons/StarOutline.svg"
                              }
                              alt=""
                              className="w-[45px] h-[47px]"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-6 pb-6">
                    <h2
                      id="write-review-title"
                      className="font-['Figtree'] font-semibold text-[28px] leading-[34px] text-[#0e0f11]"
                    >
                      What do you think about the service you received?
                    </h2>
                  </div>

                  <div className="flex flex-col gap-6 px-6">
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write your review"
                      rows={5}
                      className="w-full h-[140px] p-4 border border-[#b8c0ca] rounded-lg resize-none focus:outline-none text-base font-['Figtree'] text-[#0e0f11] placeholder:text-[#b8c0ca]"
                    />

                    <div className="flex items-center gap-2 p-4 border border-[#e3e5e8] rounded-lg">
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="font-['Figtree'] font-semibold text-[16px] leading-6 text-[#292d33]">
                          Keep my review details hidden
                        </p>
                        <p className="font-['Figtree'] font-normal text-[12px] leading-4 text-[#6a7482]">
                          Reviews with hidden content will still display your
                          name and star rating.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={keepHidden}
                        aria-label="Keep my review details hidden"
                        onClick={() => setKeepHidden((prev) => !prev)}
                        className={`relative w-[60px] h-8 rounded-full flex-shrink-0 transition-colors ${
                          keepHidden ? "bg-[#2cb34f]" : "bg-[#e3e5e8]"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                            keepHidden ? "translate-x-8" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <CTA
              onClick={step === 1 ? handleContinue : handleSubmit}
              disabled={step === 1 && rating === 0}
            >
              {step === 1 ? "Continue" : "Send review"}
            </CTA>
            {/* Spacer so content isn't hidden behind the fixed CTA */}
            <div className="h-24 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewScreen;
