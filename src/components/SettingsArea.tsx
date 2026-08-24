import React, { useState } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { MyProfileScreen } from "./MyProfileScreen";
import { ChangePasswordGateScreen } from "./ChangePasswordGateScreen";
import { mockUser } from "../data/user";

interface SettingsAreaProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

type SettingsView = "entrypoint" | "profile" | "changePassword";

interface SettingsRowConfig {
  key: string;
  icon: string;
  label: string;
  description?: string;
  showChevron?: boolean;
  onClick?: () => void;
}

const APP_VERSION = "v1.8.0-345846b7";

const SettingsRow: React.FC<{ row: SettingsRowConfig }> = ({ row }) => (
  <button
    type="button"
    onClick={row.onClick ?? (() => console.log(`${row.label} tapped`))}
    className="flex items-center gap-2 px-6 py-4 text-left w-full"
  >
    <div className="flex items-start gap-3 flex-1 min-w-0">
      <div className="size-4 flex items-center justify-center shrink-0 mt-0.5">
        <img src={row.icon} alt="" className="max-w-full max-h-full" />
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <p className="text-[16px] font-semibold leading-[24px] text-[#0e0f11]">
          {row.label}
        </p>
        {row.description && (
          <p className="text-[12px] leading-[16px] text-[#6a7482]">
            {row.description}
          </p>
        )}
      </div>
    </div>
    {row.showChevron && (
      <img
        src="/icons/ChevronDown.svg"
        alt=""
        className="w-3 h-[7px] shrink-0 -rotate-90"
      />
    )}
  </button>
);

export const SettingsArea: React.FC<SettingsAreaProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const [view, setView] = useState<SettingsView>("entrypoint");

  if (view === "profile") {
    return (
      <MyProfileScreen
        user={mockUser}
        onBack={() => setView("entrypoint")}
      />
    );
  }

  if (view === "changePassword") {
    return (
      <ChangePasswordGateScreen onBack={() => setView("entrypoint")} />
    );
  }

  const primaryRows: SettingsRowConfig[] = [
    {
      key: "profile",
      icon: "/icons/User-regular.svg",
      label: "My profile",
      description:
        "Edit your profile image, name, email, phone number and location.",
      showChevron: true,
      onClick: () => setView("profile"),
    },
    {
      key: "changePassword",
      icon: "/icons/SettingsGear.svg",
      label: "Change password",
      description: "Update and manage your password.",
      showChevron: true,
      onClick: () => setView("changePassword"),
    },
  ];

  const secondaryRows: SettingsRowConfig[] = [
    { key: "registerAsPro", icon: "/icons/Briefcase.svg", label: "Register as pro" },
    { key: "suggestFriends", icon: "/icons/Share.svg", label: "Suggest to your friends" },
    { key: "rateApp", icon: "/icons/Heart.svg", label: "Rate the App" },
    { key: "supportCenter", icon: "/icons/Support.svg", label: "Support center" },
    { key: "contactUs", icon: "/icons/Pencil.svg", label: "Contact us" },
    {
      key: "dataPrivacy",
      icon: "/icons/Padlock.svg",
      label: "Data and privacy",
      showChevron: true,
    },
  ];

  const logoutRow: SettingsRowConfig = {
    key: "logout",
    icon: "/icons/Logout.svg",
    label: "Logout",
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="py-3">
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          Settings
        </h1>
      </div>

      <div className="flex items-end gap-3 px-6 pt-6 pb-6">
        <div className="flex-1 flex flex-col justify-end text-[#0e0f11] min-w-0">
          <p className="text-[14px] leading-[22px]">Hello,</p>
          <p className="text-[20px] font-semibold leading-[28px] truncate">
            {mockUser.name}
          </p>
        </div>
        <div className="size-[80px] rounded-full overflow-hidden border border-[#e3e5e8] shrink-0">
          <img
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {primaryRows.map((row, index) => (
          <React.Fragment key={row.key}>
            <SettingsRow row={row} />
            {index < primaryRows.length - 1 && (
              <div className="h-px bg-[#e3e5e8] mx-6" />
            )}
          </React.Fragment>
        ))}

        <div className="h-px bg-[#e3e5e8] mx-6" />

        {secondaryRows.map((row) => (
          <React.Fragment key={row.key}>
            <SettingsRow row={row} />
            <div className="h-px bg-[#e3e5e8] mx-6" />
          </React.Fragment>
        ))}

        <div className="h-6" />

        <SettingsRow row={logoutRow} />

        <p className="text-[12px] leading-[16px] text-[#6a7482] text-center py-4">
          App version {APP_VERSION}
        </p>
      </div>

      <BottomNavigation currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
};
