import React from "react";

// Search icon from Figma export
const searchIcon = "/97de8f0522c03c6bec40d59ebf135bf196e80ec5.svg";

interface SearchBarProps {
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = () => {
    console.log("SearchBar: handleSearch called");
    onSearch();
  };

  return (
    <div
      className="bg-white border border-[#f0f1f2] box-border flex gap-[8px] items-center justify-center max-w-[480px] min-w-[327px] pl-[16px] pr-[4px] py-[4px] rounded-[40px] w-full cursor-pointer"
      onClick={handleSearch}
    >
      <div className="basis-0 flex flex-col font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-hidden text-[#6a7482] text-[14px] text-nowrap">
        <p className="leading-[22px] overflow-hidden">
          What service are you looking for?
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSearch();
        }}
        className="bg-[#2cb34f] box-border flex flex-col gap-[8px] items-center justify-center p-[10px] rounded-[999px]"
      >
        <div className="flex gap-[8px] items-center justify-center">
          <div className="relative size-[16px]">
            <div className="absolute inset-[7.81%_5.87%_5.87%_7.81%]">
              <img
                alt="Search"
                className="block max-w-none size-full"
                src={searchIcon}
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
