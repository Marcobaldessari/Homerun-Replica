import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

export type ContactPreference = "call" | "message-only";

export interface ContactPreferenceValue {
  phoneNumber: string;
  contactPreference: ContactPreference;
}

interface ContactPreferenceStepProps {
  serviceName: string;
  progressValue: number;
  /**
   * When true, renders the "phone sharing is mandatory" variant (Figma node
   * 4179:91232): the contact-preference chooser is replaced by a static info
   * banner and the phone number is always shared with quoting pros.
   * Defaults to false, which renders the standard variant (4179:91134) where
   * the visitor picks how pros may contact them.
   */
  phoneSharingRequired?: boolean;
  onNext: (value: ContactPreferenceValue) => void;
  onBack: () => void;
  onClose: () => void;
}

const CONTACT_PREFERENCE_OPTIONS: { label: string; value: ContactPreference }[] = [
  { label: "Service provider can call", value: "call" },
  { label: "I do not want to be called, send quotes via email", value: "message-only" },
];

export const ContactPreferenceStep: React.FC<ContactPreferenceStepProps> = ({
  serviceName,
  progressValue,
  phoneSharingRequired = false,
  onNext,
  onBack,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactPreference, setContactPreference] = useState<ContactPreference>("call");
  const [wantsMarketing, setWantsMarketing] = useState(false);

  const handleNextClick = () => {
    if (!phoneNumber.trim()) return;
    onNext({
      phoneNumber: phoneNumber.trim(),
      contactPreference: phoneSharingRequired ? "call" : contactPreference,
    });
  };

  const CheckedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="4" fill="#2CB34F" />
      <path
        d="M8.75 13.396L5.357 10l1.179-1.179L8.75 11.036l4.714-4.714L14.643 7.5 8.75 13.396Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header title={serviceName} onBackClick={onBack} onCloseClick={onClose} />

      {/* Progress Bar */}
      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={progressValue} />
      </div>

      {/* Price Range */}
      <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />

      {/* Form Content */}
      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Enter your phone number
          </h2>
        </div>

        <div className="px-6 flex flex-col gap-6">
          {/* Mobile Number */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-end">
              <div className="flex flex-col gap-2 w-[135px] flex-shrink-0">
                <span className="text-base font-semibold text-[#0e0f11]">
                  Mobile number
                </span>
                <div className="flex items-center gap-4 px-4 py-[17px] border border-[#b8c0ca] rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <img
                      src="/icons/FlagUK.svg"
                      alt=""
                      className="w-6 h-4 rounded-[4px] flex-shrink-0"
                    />
                    <span className="text-base text-[#292d33] whitespace-nowrap overflow-hidden text-ellipsis">
                      +44
                    </span>
                  </div>
                  <img
                    src="/icons/ChevronDown.svg"
                    alt=""
                    className="w-3 h-[7px] flex-shrink-0"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="7400 2345678"
                  className="w-full h-14 px-4 border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none"
                />
              </div>
            </div>

            {!phoneSharingRequired && (
              <>
                <div className="flex flex-col mb-4">
                  {CONTACT_PREFERENCE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start gap-2 mb-5 last:mb-0 cursor-pointer"
                      onClick={() => setContactPreference(option.value)}
                    >
                      <input
                        type="radio"
                        name="contact-preference"
                        value={option.value}
                        checked={contactPreference === option.value}
                        onChange={() => setContactPreference(option.value)}
                        className="sr-only"
                      />
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border ${
                            contactPreference === option.value
                              ? "border-[#2cb34f]"
                              : "border-[#b8c0ca]"
                          }`}
                        >
                          {contactPreference === option.value && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2cb34f]"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-base text-[#0e0f11]">{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-[#6a7482] leading-4">
                  Our Pros can contact you faster if you select "Service provider
                  can call"
                </p>
              </>
            )}
          </div>

          {/* Marketing opt-in */}
          <button
            type="button"
            className="flex items-start gap-2 w-full text-left"
            onClick={() => setWantsMarketing((prev) => !prev)}
          >
            <div className="flex-shrink-0 pt-px">
              {wantsMarketing ? (
                <CheckedIcon />
              ) : (
                <div className="w-5 h-5 border border-[#b8c0ca] rounded bg-white" />
              )}
            </div>
            <span className="text-sm text-[#0e0f11]">
              I want to receive electronic messages regarding personalised
              offers or promotions.
            </span>
          </button>

          {/* Mandatory phone-sharing info banner */}
          {phoneSharingRequired && (
            <div className="bg-[#f9fafa] rounded-lg p-3 flex flex-col gap-3">
              <div className="flex items-start gap-1">
                <img src="/icons/Info.svg" alt="" className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-semibold text-[#3a3f46]">Info</span>
              </div>
              <p className="text-xs text-[#3a3f46] leading-4">
                We'll share your number with professionals who send you
                quotes. This will allow you to get a better and faster
                service.
              </p>
            </div>
          )}
        </div>

        {/* Legal disclaimer, pinned above the CTA */}
        <div className="mt-auto px-6 pt-4">
          <div className="h-px bg-[#e3e5e8] mb-4" />
          <p className="text-xs leading-4 text-[#292d33] text-center">
            By pressing Send request, you agree to our{" "}
            <span className="font-semibold underline">user</span> and{" "}
            <span className="font-semibold underline">privacy policies</span>.
            This site is protected by reCAPTCHA.
          </p>
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleNextClick} disabled={!phoneNumber.trim()}>
        Send request
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
