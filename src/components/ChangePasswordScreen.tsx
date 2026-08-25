import React, { useState } from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";
import {
  MOCK_CURRENT_PASSWORD,
  MOCK_PASSWORD_UPDATE_FAILURE_TRIGGER,
} from "../data/user";

interface ChangePasswordScreenProps {
  onBack: () => void;
  onForgotPassword?: () => void;
}

const MIN_LENGTH = 6;

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  onBack,
  onForgotPassword,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [banner, setBanner] = useState<"success" | "error" | null>(null);

  const missingFields =
    !oldPassword.trim() || !newPassword.trim() || !repeatPassword.trim();
  const tooShort = newPassword.length > 0 && newPassword.length < MIN_LENGTH;
  const mismatched =
    newPassword.length > 0 &&
    repeatPassword.length > 0 &&
    newPassword !== repeatPassword;
  const wrongOldPassword =
    oldPassword.length > 0 && oldPassword !== MOCK_CURRENT_PASSWORD;

  const isValid =
    !missingFields && !tooShort && !mismatched && !wrongOldPassword;

  const oldPasswordError = touched
    ? !oldPassword.trim()
      ? "Required field"
      : wrongOldPassword
      ? "Wrong password"
      : null
    : null;

  const newPasswordError = touched
    ? !newPassword.trim()
      ? "Required field"
      : tooShort
      ? "Password should be at least 6 characters long"
      : null
    : null;

  const repeatPasswordError = touched
    ? !repeatPassword.trim()
      ? "Required field"
      : mismatched
      ? "Passwords do not match"
      : null
    : null;

  const handleSave = () => {
    setTouched(true);
    setBanner(null);
    if (!isValid) return;

    if (newPassword === MOCK_PASSWORD_UPDATE_FAILURE_TRIGGER) {
      setBanner("error");
      return;
    }

    setBanner("success");
    setOldPassword("");
    setNewPassword("");
    setRepeatPassword("");
    setTouched(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {banner === "success" && (
        <div className="flex items-center justify-between gap-2 bg-[#003b25] text-white px-4 py-3 text-sm font-medium">
          <span>Your password has been successfully updated</span>
          <button type="button" onClick={() => setBanner(null)} aria-label="Dismiss">
            ✕
          </button>
        </div>
      )}
      {banner === "error" && (
        <div className="flex items-center justify-between gap-2 bg-[#d71d36] text-white px-4 py-3 text-sm font-medium">
          <span>Something went wrong. We couldn't update your password</span>
          <button type="button" onClick={() => setBanner(null)} aria-label="Dismiss">
            ✕
          </button>
        </div>
      )}

      <Header title="Change password" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Change your password
          </h2>
          <p className="text-sm text-[#6a7482]">
            To update your credentials, please enter your old password and
            your new password.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="cp-old" className="text-base font-semibold text-[#0e0f11]">
              Old password
            </label>
            <input
              id="cp-old"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full h-14 px-4 border rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none ${
                oldPasswordError ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
            {oldPasswordError && (
              <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-1">
                <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
                {oldPasswordError}
              </p>
            )}
            <button
              type="button"
              onClick={onForgotPassword ?? (() => console.log("Forgot your password?"))}
              className="text-sm font-semibold text-[#0e0f11] underline w-fit mt-1"
            >
              Forgot your password?
            </button>
          </div>

          <div className="h-px bg-[#e3e5e8]" />

          <div className="flex flex-col gap-1">
            <label htmlFor="cp-new" className="text-base font-semibold text-[#0e0f11]">
              New password
            </label>
            <input
              id="cp-new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={`w-full h-14 px-4 border rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none ${
                newPasswordError ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
            {newPasswordError && (
              <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-1">
                <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
                {newPasswordError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cp-repeat" className="text-base font-semibold text-[#0e0f11]">
              Repeat new password
            </label>
            <input
              id="cp-repeat"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repeat new password"
              className={`w-full h-14 px-4 border rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none ${
                repeatPasswordError ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
            {repeatPasswordError && (
              <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-1">
                <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
                {repeatPasswordError}
              </p>
            )}
          </div>
        </div>
      </div>

      <CTA onClick={handleSave}>Save</CTA>
    </div>
  );
};
