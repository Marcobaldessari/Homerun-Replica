import React from "react";
import { Header } from "./FormHeader";
import { MockUser } from "../data/user";

interface MyProfileScreenProps {
  user: MockUser;
  onBack: () => void;
  onEditName: () => void;
  onEditPhone: () => void;
  onEditAddress: () => void;
  onEditCallPreferences: () => void;
}

interface ProfileRow {
  label: string;
  value: string;
  onClick?: () => void;
}

const CALL_PREFERENCE_LABEL: Record<MockUser["callPreference"], string> = {
  call: "Service provider can call and see my number",
  "message-only": "Send quotes via email only",
};

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  user,
  onBack,
  onEditName,
  onEditPhone,
  onEditAddress,
  onEditCallPreferences,
}) => {
  const rows: ProfileRow[] = [
    { label: "Name and surname", value: user.name, onClick: onEditName },
    { label: "Email", value: user.email },
    {
      label: "Mobile number",
      value: `${user.countryCode} ${user.phone}`,
      onClick: onEditPhone,
    },
    { label: "Location preferences", value: user.location, onClick: onEditAddress },
    {
      label: "Call preferences",
      value: CALL_PREFERENCE_LABEL[user.callPreference],
      onClick: onEditCallPreferences,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header title="My profile" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col items-center pt-6 pb-4">
        <div className="size-[120px] rounded-full overflow-hidden border border-[#e3e5e8]">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="size-full object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => console.log("Edit photo")}
          className="mt-4 px-4 py-[7px] rounded-lg border-2 border-[#f0f1f2] text-sm font-semibold text-[#292d33]"
        >
          Edit photo
        </button>
      </div>

      <div className="flex flex-col">
        {rows.map((row, index) => (
          <React.Fragment key={row.label}>
            <button
              type="button"
              onClick={row.onClick ?? (() => console.log(`Edit ${row.label}`))}
              className="flex items-center gap-2 px-6 py-4 text-left w-full"
            >
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <p className="text-[16px] font-semibold leading-[24px] text-[#0e0f11]">
                  {row.label}
                </p>
                <p className="text-[12px] leading-[16px] text-[#6a7482] truncate">
                  {row.value}
                </p>
              </div>
              <img
                src="/icons/ChevronDown.svg"
                alt=""
                className="w-3 h-[7px] shrink-0 -rotate-90"
              />
            </button>
            {index < rows.length - 1 && (
              <div className="h-px bg-[#e3e5e8] mx-6" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
