import React from "react";

// Navigation icons from Figma export
const homeIcon = "/8aeffadd43b5937e295967f8bae77ee2a167f45b.svg";
const searchIcon = "/8dc1cb8224fe58f25816f561467043cceb7d3cf9.svg";
const profileIcon = "/948b44367356d5e285aa1bdc11820db244c2302f.svg";
const requestsIcon = "/8491dfae681418841205351e21c53f912a2a5856.svg";

export const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bg-white border-t border-[#f0f1f2] bottom-0 flex gap-[32px] items-center justify-center left-0 px-[24px] py-[12px] right-0 z-40">
      {/* Home */}
      <div className="flex flex-col gap-[4px] items-center">
        <div className="relative size-[24px]">
          <img
            alt="Home"
            className="block max-w-none size-full"
            src={homeIcon}
          />
        </div>
        <p className="font-medium leading-[20px] text-[#2cb34f] text-[12px]">
          Home
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-[4px] items-center">
        <div className="relative size-[24px]">
          <img
            alt="Search"
            className="block max-w-none size-full"
            src={searchIcon}
          />
        </div>
        <p className="font-medium leading-[20px] text-[#6a7482] text-[12px]">
          Search
        </p>
      </div>

      {/* Requests */}
      <div className="flex flex-col gap-[4px] items-center">
        <div className="relative size-[24px]">
          <img
            alt="Requests"
            className="block max-w-none size-full"
            src={requestsIcon}
          />
        </div>
        <p className="font-medium leading-[20px] text-[#6a7482] text-[12px]">
          Requests
        </p>
      </div>

      {/* Profile */}
      <div className="flex flex-col gap-[4px] items-center">
        <div className="relative size-[24px]">
          <img
            alt="Profile"
            className="block max-w-none size-full"
            src={profileIcon}
          />
        </div>
        <p className="font-medium leading-[20px] text-[#6a7482] text-[12px]">
          Profile
        </p>
      </div>
    </div>
  );
};
