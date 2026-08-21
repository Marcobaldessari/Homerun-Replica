import React, { useEffect, useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 29;

interface AuthEmailOTPScreenProps {
  serviceName: string;
  progressValue: number;
  onNext: (code: string) => void;
  onBack: () => void;
  onClose: () => void;
  /** Email address the code was sent to, shown in the helper copy. */
  email?: string;
  /** Optional: called when the user requests a new code. Defaults to just resetting the countdown. */
  onResendCode?: () => void;
  /** Optional: user wants to log in with a password instead of a code. */
  onSwitchToPassword?: () => void;
}

const formatCountdown = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

export const AuthEmailOTPScreen: React.FC<AuthEmailOTPScreenProps> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
  email = "your email",
  onResendCode,
  onSwitchToPassword,
}) => {
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const isValid = code.trim().length === CODE_LENGTH;

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onNext(code.trim());
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setCode("");
    setTouched(false);
    if (onResendCode) onResendCode();
    else console.log("Resend verification code");
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
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Enter verification code
          </h2>
          <p className="text-sm text-[#6a7482]">
            Please enter the {CODE_LENGTH} digit code we&rsquo;ve just sent to
            the email{" "}
            <span className="font-semibold text-[#6a7482]">{email}</span>
          </p>
        </div>

        <div className="px-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="auth-otp-code"
                className="text-base font-semibold text-[#0e0f11]"
              >
                Verification code
              </label>
              <input
                id="auth-otp-code"
                type="text"
                inputMode="numeric"
                maxLength={CODE_LENGTH}
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH))
                }
                placeholder={`Enter the ${CODE_LENGTH} digit code`}
                className="w-full h-14 px-4 border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] tracking-[4px] focus:outline-none"
              />
              {touched && !isValid && (
                <p className="text-sm text-[#e1590e]">
                  Please enter the {CODE_LENGTH}-digit code.
                </p>
              )}
            </div>

            {secondsLeft > 0 ? (
              <p className="text-sm text-[#6a7482]">
                Resend the code in {formatCountdown(secondsLeft)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-left text-sm font-semibold text-[#0e0f11] underline w-fit"
              >
                Resend code
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-px bg-[#f0f1f2]" />
            <span className="text-sm text-[#6a7482]">or</span>
            <div className="flex-1 h-px bg-[#f0f1f2]" />
          </div>

          {/* Switch to password login */}
          <button
            type="button"
            onClick={() =>
              onSwitchToPassword
                ? onSwitchToPassword()
                : console.log("Switch to password login")
            }
            className="w-full flex items-center justify-center gap-2 border-2 border-[#f0f1f2] rounded-lg px-8 py-4"
          >
            <img src="/icons/Padlock.svg" alt="" className="w-4 h-4" />
            <span className="text-base font-semibold text-[#292d33]">
              Log in with password
            </span>
          </button>
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleSubmit} disabled={touched && !isValid}>
        Verify
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
