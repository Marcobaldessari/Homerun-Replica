import React, { useState } from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";
import { PHONE_NUMBERS_IN_USE } from "../data/user";

interface PhoneNumberEditScreenProps {
  countryCode: string;
  phone: string;
  onSave: (countryCode: string, phone: string) => void;
  onBack: () => void;
}

const COUNTRIES = [
  { name: "Austria", code: "+43" },
  { name: "Czech Republic", code: "+420" },
  { name: "Egypt", code: "+20" },
  { name: "Spain", code: "+34" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Hungary", code: "+36" },
  { name: "Italy", code: "+39" },
  { name: "Poland", code: "+48" },
  { name: "Romania", code: "+40" },
  { name: "Saudi Arabia", code: "+966" },
];

export const PhoneNumberEditScreen: React.FC<PhoneNumberEditScreenProps> = ({
  countryCode,
  phone,
  onSave,
  onBack,
}) => {
  const [selectedCode, setSelectedCode] = useState(countryCode);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [touched, setTouched] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const digitsOnly = phoneNumber.replace(/\D/g, "");
  const isRequired = digitsOnly.length === 0;
  const isInvalidFormat = !isRequired && digitsOnly.length < 6;
  const isAlreadyUsed =
    !isRequired && !isInvalidFormat && PHONE_NUMBERS_IN_USE.includes(digitsOnly);
  const isValid = !isRequired && !isInvalidFormat && !isAlreadyUsed;

  const errorMessage = touched
    ? isRequired
      ? "This field is required."
      : isInvalidFormat
      ? "Please provide a valid mobile number."
      : isAlreadyUsed
      ? "This phone is already being used by another user, please check the number you've entered and if you need help please reach our support team via support@homerun.co.uk"
      : null
    : null;

  const handleSave = () => {
    setTouched(true);
    if (isRequired || isInvalidFormat || isAlreadyUsed) return;
    onSave(selectedCode, digitsOnly);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      <Header title="Mobile number" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Your mobile number
          </h2>
          <p className="text-sm text-[#6a7482]">
            Service providers need your phone number to contact directly.
            Changes won't affect call preferences for your active requests
            but will apply to new ones.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-1 relative">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPickerOpen((open) => !open)}
              className="w-[110px] h-14 flex items-center justify-between px-3 border border-[#b8c0ca] rounded-lg shrink-0"
            >
              <span className="text-base text-[#292d33]">{selectedCode}</span>
              <img
                src="/icons/ChevronDown.svg"
                alt=""
                className={`w-3 h-[7px] transition-transform ${pickerOpen ? "rotate-180" : ""}`}
              />
            </button>
            <input
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Mobile number"
              aria-label="Mobile number"
              className={`flex-1 h-14 px-4 border rounded-lg text-base text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none min-w-0 ${
                errorMessage ? "border-[#e1590e]" : "border-[#b8c0ca]"
              }`}
            />
          </div>

          {pickerOpen && (
            <div className="absolute top-16 left-0 z-20 w-[220px] max-h-64 overflow-y-auto bg-white border border-[#e3e5e8] rounded-lg shadow-lg py-2">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCode(country.code);
                    setPickerOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                    country.code === selectedCode
                      ? "font-semibold text-[#0e0f11]"
                      : "text-[#292d33]"
                  }`}
                >
                  <span>{country.name}</span>
                  <span>{country.code}</span>
                </button>
              ))}
            </div>
          )}

          {errorMessage && (
            <p className="text-sm text-[#e1590e] flex items-start gap-1 mt-2">
              <img src="/icons/AlertCircleFull.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <CTA onClick={handleSave} disabled={touched && !isValid}>
        Save
      </CTA>
    </div>
  );
};
