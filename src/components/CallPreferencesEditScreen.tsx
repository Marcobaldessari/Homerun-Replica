import React, { useState } from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";
import { ContactPreference } from "../data/user";

interface CallPreferencesEditScreenProps {
  callPreference: ContactPreference;
  onSave: (preference: ContactPreference) => void;
  onBack: () => void;
}

const OPTIONS: { label: string; value: ContactPreference }[] = [
  { label: "Service provider can call and see my number.", value: "call" },
  { label: "I do not want to be called, send quotes via email.", value: "message-only" },
];

export const CallPreferencesEditScreen: React.FC<CallPreferencesEditScreenProps> = ({
  callPreference,
  onSave,
  onBack,
}) => {
  const [preference, setPreference] = useState(callPreference);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      <Header title="Call preferences" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Manage your contact preferences
          </h2>
          <p className="text-sm text-[#6a7482]">
            Adjust your call preferences to decide who can contact you. Only
            service providers responding to your request will receive your
            contact information.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-5">
          {OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => setPreference(option.value)}
            >
              <input
                type="radio"
                name="call-preference"
                value={option.value}
                checked={preference === option.value}
                onChange={() => setPreference(option.value)}
                className="sr-only"
              />
              <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                <div
                  className={`w-6 h-6 rounded-full border ${
                    preference === option.value ? "border-[#2cb34f]" : "border-[#b8c0ca]"
                  }`}
                >
                  {preference === option.value && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2cb34f]" />
                  )}
                </div>
              </div>
              <span className="text-base text-[#0e0f11]">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <CTA onClick={() => onSave(preference)}>Save</CTA>
    </div>
  );
};
