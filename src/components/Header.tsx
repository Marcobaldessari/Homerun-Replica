import React from "react";
import { SearchBar } from "./SearchBar";

// Image URLs from the Figma export
const logomark = "/6bc48a6e3f12d4f9a25060895c2044dce86e020f.svg";
const logotype = "/6c3ee72da4b78702807492fd70de7ca47d5e20ab.svg";

interface HeaderProps {
  onSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="bg-white w-full relative z-10">
      {/* Logo and Search Section */}
      <div className="bg-white flex flex-col gap-[24px] items-center left-0 pt-[40px] right-0">
        <div className="box-border flex flex-col gap-[24px] items-center px-[24px] w-full">
          {/* Logo */}
          <div className="flex gap-[7px] items-end overflow-clip">
            <div className="h-[19.769px] w-[12.427px]">
              <img
                alt=""
                className="block max-w-none w-full h-full"
                src={logomark}
              />
            </div>
            <div className="h-[16.001px] w-[87.285px]">
              <img
                alt=""
                className="block max-w-none w-full h-full"
                src={logotype}
              />
            </div>
          </div>
          {/* Search Bar Component */}
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};
