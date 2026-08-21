import React, { useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

export interface AuthEmailPasswordValue {
  email: string;
  password: string;
}

interface AuthEmailPasswordScreenProps {
  serviceName: string;
  progressValue: number;
  onNext: (value: AuthEmailPasswordValue) => void;
  onBack: () => void;
  onClose: () => void;
  /** Optional: user wants a passwordless (magic-link/OTP) login instead. Receives the email typed so far, if any. */
  onLoginWithoutPassword?: (email: string) => void;
  /** Optional: user wants to switch to phone-number login instead. */
  onSwitchToPhoneLogin?: () => void;
}

const isEmailLike = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const AuthEmailPasswordScreen: React.FC<
  AuthEmailPasswordScreenProps
> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
  onLoginWithoutPassword,
  onSwitchToPhoneLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailValid = isEmailLike(email.trim());
  const passwordValid = password.trim().length > 0;
  const isValid = emailValid && passwordValid;

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onNext({ email: email.trim(), password });
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
            Log in to continue
          </h2>
        </div>

        <div className="px-6 flex flex-col gap-4">
          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="auth-email"
              className="text-base font-semibold text-[#0e0f11]"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email@gmail.com"
              className="w-full h-14 px-4 bg-[#f9fafa] border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none"
            />
            {touched && !emailValid && (
              <p className="text-sm text-[#e1590e]">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="auth-password"
              className="text-base font-semibold text-[#0e0f11]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-14 pl-4 pr-12 border border-[#b8c0ca] rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src="/icons/EyeShowPassword.svg"
                  alt=""
                  className="w-6 h-6"
                />
              </button>
            </div>
            {touched && !passwordValid && (
              <p className="text-sm text-[#e1590e]">
                Please enter your password.
              </p>
            )}
          </div>

          {/* Passwordless link */}
          <button
            type="button"
            onClick={() =>
              onLoginWithoutPassword
                ? onLoginWithoutPassword(email.trim())
                : console.log("Log in without a password")
            }
            className="text-left text-sm font-semibold text-[#0e0f11] underline w-fit"
          >
            Log in without a password
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-px bg-[#f0f1f2]" />
            <span className="text-sm text-[#6a7482]">or</span>
            <div className="flex-1 h-px bg-[#f0f1f2]" />
          </div>

          {/* Switch to phone login */}
          <button
            type="button"
            onClick={() =>
              onSwitchToPhoneLogin
                ? onSwitchToPhoneLogin()
                : console.log("Switch to phone login")
            }
            className="w-full flex items-center justify-center gap-2 border-2 border-[#f0f1f2] rounded-lg px-8 py-4"
          >
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <img
                src="/icons/PhoneIcon.svg"
                alt=""
                className="w-[9px] h-[13px]"
              />
            </div>
            <span className="text-base font-semibold text-[#292d33]">
              Log in with phone number
            </span>
          </button>
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleSubmit} disabled={touched && !isValid}>
        Log in
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
