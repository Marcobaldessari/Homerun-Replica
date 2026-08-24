import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

interface AuthPhoneScreenProps {
  serviceName: string;
  progressValue: number;
  onNext: (value: string) => void;
  onBack: () => void;
  onClose: () => void;
  /** Optional: user wants to switch to email login instead. */
  onSwitchToEmailLogin?: () => void;
}

const CountryFlag: React.FC = () => (
  <div className="relative w-6 h-4 rounded-[4px] border-[0.5px] border-[#e3e5e8] overflow-hidden flex flex-shrink-0">
    <div className="w-2 h-full bg-[#009246]" />
    <div className="w-2 h-full bg-white" />
    <div className="w-2 h-full bg-[#ce2b37]" />
  </div>
);

export const AuthPhoneScreen: React.FC<AuthPhoneScreenProps> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
  onSwitchToEmailLogin,
}) => {
  const [countryCode] = useState("+39");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const digitsOnly = phoneNumber.replace(/\D/g, "");
  const isValid = digitsOnly.length >= 6;

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onNext(`${countryCode} ${phoneNumber.trim()}`);
  };

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
      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Enter your mobile number
          </h2>
        </div>

        <div className="px-6 flex flex-col gap-4">
          <div className="flex gap-3 items-end">
            {/* Country code selector (single supported country in this prototype) */}
            <div className="flex flex-col gap-1 w-[135px] flex-shrink-0">
              <label className="text-base font-semibold text-[#0e0f11]">
                Mobile number
              </label>
              <button
                type="button"
                className="w-full h-14 flex items-center gap-2 px-4 border border-[#b8c0ca] rounded-lg"
              >
                <CountryFlag />
                <span className="flex-1 text-base text-[#292d33] text-left truncate">
                  {countryCode}
                </span>
                <img
                  src="/icons/ChevronDown.svg"
                  alt=""
                  className="w-3 h-[7px] flex-shrink-0"
                />
              </button>
            </div>

            {/* Phone number input */}
            <input
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="501 234 56 78"
              aria-label="Phone number"
              className="flex-1 h-14 px-4 border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none min-w-0"
            />
          </div>
          {touched && !isValid && (
            <p className="text-sm text-[#e1590e] -mt-2">
              Please enter a valid phone number.
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-px bg-[#f0f1f2]" />
            <span className="text-sm text-[#6a7482]">or</span>
            <div className="flex-1 h-px bg-[#f0f1f2]" />
          </div>

          {/* Switch to email login */}
          <button
            type="button"
            onClick={() =>
              onSwitchToEmailLogin
                ? onSwitchToEmailLogin()
                : console.log("Switch to email login")
            }
            className="w-full flex items-center justify-center gap-2 border-2 border-[#f0f1f2] rounded-lg px-8 py-4"
          >
            <img src="/icons/Envelope.svg" alt="" className="w-4 h-4" />
            <span className="text-base font-semibold text-[#292d33]">
              Log in with email
            </span>
          </button>

          <p className="text-xs text-[#6a7482]">
            This site is protected by reCAPTCHA.
          </p>
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleSubmit} disabled={touched && !isValid}>
        Continue
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
