import React from "react";
import { Header } from "./FormHeader";
import { MockUser } from "../data/user";

interface MyProfileScreenProps {
  user: MockUser;
  onBack: () => void;
}

interface ProfileRow {
  label: string;
  value: string;
}

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  user,
  onBack,
}) => {
  const rows: ProfileRow[] = [
    { label: "Name and surname", value: user.name },
    { label: "Email", value: user.email },
    { label: "Mobile number", value: user.phone },
    { label: "Location preferences", value: user.location },
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
              onClick={() => console.log(`Edit ${row.label}`)}
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
                className="size-4 shrink-0 -rotate-90"
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
