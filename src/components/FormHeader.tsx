import React from "react";

const backIcon = "/69bc3e7016a8de92b9799edcf4448eb40f3c8fe2.svg";

interface FormHeaderProps {
  title: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  showBackButton?: boolean;
  showCloseButton?: boolean;
}

export const Header: React.FC<FormHeaderProps> = ({
  title,
  onBackClick,
  onCloseClick,
  showBackButton = true,
  showCloseButton = true,
}) => {
  return (
    <div className="bg-white px-4 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex justify-start w-8">
          {showBackButton && onBackClick ? (
            <button
              onClick={onBackClick}
              aria-label="Back"
              className="w-8 h-8 flex items-center justify-center"
            >
              <img src={backIcon} alt="" className="w-6 h-6" />
            </button>
          ) : (
            <span className="invisible w-8 h-8" />
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-800 text-center whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
          {title}
        </h1>
        <div className="flex justify-end w-8">
          {showCloseButton && onCloseClick ? (
            <button
              onClick={onCloseClick}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center"
            >
              <img src="/icons/Close.svg" alt="" className="w-4 h-4" />
            </button>
          ) : (
            <span className="invisible w-8 h-8" />
          )}
        </div>
      </div>
    </div>
  );
};
