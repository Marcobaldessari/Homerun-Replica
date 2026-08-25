import React, { useState } from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";

interface NameSurnameEditScreenProps {
  name: string;
  onSave: (fullName: string) => void;
  onBack: () => void;
}

const MAX_LENGTH = 256;
const INVALID_CHARS = /[0-9@$*!#%^&()_+=[\]{};:"\\|,.<>/?~`]/;

const splitName = (fullName: string) => {
  const [first = "", ...rest] = fullName.trim().split(/\s+/);
  return { first, last: rest.join(" ") };
};

const validate = (value: string) => {
  if (!value.trim()) return "This field is required.";
  if (value.length > MAX_LENGTH) return "This field can be up to 256 characters.";
  if (INVALID_CHARS.test(value)) {
    return "This field cannot contain numbers, punctuation, or special characters (@, $, *, …).";
  }
  return null;
};

export const NameSurnameEditScreen: React.FC<NameSurnameEditScreenProps> = ({
  name,
  onSave,
  onBack,
}) => {
  const initial = splitName(name);
  const [firstName, setFirstName] = useState(initial.first);
  const [lastName, setLastName] = useState(initial.last);
  const [touched, setTouched] = useState(false);

  const firstError = touched ? validate(firstName) : null;
  const lastError = touched ? validate(lastName) : null;
  const isValid = !validate(firstName) && !validate(lastName);

  const handleSave = () => {
    setTouched(true);
    if (validate(firstName) || validate(lastName)) return;
    onSave(`${firstName.trim()} ${lastName.trim()}`.trim());
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      <Header title="Name and surname" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Your name and surname
          </h2>
          <p className="text-sm text-[#6a7482]">
            This is the name professionals see on your profile.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="settings-first-name" className="text-base font-semibold text-[#0e0f11]">
              Name
            </label>
            <input
              id="settings-first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full h-14 px-4 border rounded-lg text-base text-[#0e0f11] focus:outline-none ${
                firstError ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
            {firstError && (
              <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-1">
                <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
                {firstError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="settings-last-name" className="text-base font-semibold text-[#0e0f11]">
              Surname
            </label>
            <input
              id="settings-last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full h-14 px-4 border rounded-lg text-base text-[#0e0f11] focus:outline-none ${
                lastError ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
            {lastError && (
              <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-1">
                <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
                {lastError}
              </p>
            )}
          </div>
        </div>
      </div>

      <CTA onClick={handleSave} disabled={touched && !isValid}>
        Save
      </CTA>
    </div>
  );
};
