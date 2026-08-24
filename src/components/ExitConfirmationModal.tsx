import React from "react";

export interface ExitConfirmationModalProps {
  /**
   * Which copy to show:
   * - "firstStep": the user hasn't answered any questions yet.
   * - "midFlow": the user has made some progress through the wizard.
   */
  variant: "firstStep" | "midFlow";
  /** Called when the user confirms they want to leave (taps "Quit"). Caller should reset state and navigate away. */
  onExit: () => void;
  /** Called when the user dismisses the modal and stays in the flow (taps "Continue" or the scrim). */
  onContinue: () => void;
  /**
   * Optional: percentage of questions completed so far, interpolated into the
   * "midFlow" message ("You have completed {progressPercent}% of the questions...").
   * Ignored for the "firstStep" variant. Defaults to 60 to match the Figma reference
   * (node 3762:39632) — pass the wizard's real progress once it's tracked.
   */
  progressPercent?: number;
}

/**
 * "Are you sure you want to leave?" confirmation shown when the user taps the
 * close (X) button mid-wizard. Renders as a centered modal card over a scrim.
 *
 * The parent controls visibility by conditionally rendering this component
 * (no internal `isOpen` prop) — render `null`/omit it when the modal should
 * be hidden, e.g. `{showExitModal && <ExitConfirmationModal ... />}`.
 */
export const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  variant,
  onExit,
  onContinue,
  progressPercent = 60,
}) => {
  const message =
    variant === "midFlow"
      ? `You have completed ${progressPercent}% of the questions. Answer a few more to get free quotes.`
      : "You can get free quotes by answering few more questions.";

  return (
    <div className="fixed inset-0 z-[60] flex justify-center">
      {/* Column matching the app's max-w-md mobile viewport (see NavigationApp.tsx) */}
      <div className="relative w-full max-w-md h-full">
        {/* Scrim */}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onContinue}
          className="absolute inset-0 w-full h-full bg-black/[0.28] cursor-default"
        />

        {/* Modal card */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-confirmation-title"
            aria-describedby="exit-confirmation-message"
            className="pointer-events-auto w-full max-w-[327px] bg-white rounded-lg pt-10 pb-8 px-6 flex flex-col items-center gap-10"
          >
            <div className="flex flex-col items-center gap-6 text-center text-[#0e0f11]">
              <p
                id="exit-confirmation-title"
                className="font-['Figtree'] font-semibold text-[20px] leading-[28px]"
              >
                Are you sure?
              </p>
              <p
                id="exit-confirmation-message"
                className="font-['Figtree'] font-normal text-[14px] leading-[22px]"
              >
                {message}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-4 w-full">
              <button
                type="button"
                onClick={onContinue}
                className="w-full py-4 px-8 bg-white border-2 border-[#f0f1f2] rounded-lg font-['Figtree'] font-semibold text-[16px] leading-6 text-[#292d33] text-center transition-colors hover:bg-[#f7f8f8]"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={onExit}
                className="w-full py-4 px-8 bg-[#d71d36] rounded-lg font-['Figtree'] font-semibold text-[16px] leading-6 text-white text-center transition-colors hover:bg-[#b8172c]"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
