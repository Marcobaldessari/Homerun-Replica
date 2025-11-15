import React from "react";

interface FormHeaderProps {
  title: string;
  onBackClick?: () => void;
  onCloseClick: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<FormHeaderProps> = ({
  title,
  onBackClick,
  onCloseClick,
  showBackButton = true,
}) => {
  return (
    <div className="bg-white px-4 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex justify-start w-6">
          {showBackButton && onBackClick ? (
            <button
              onClick={onBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ←
            </button>
          ) : (
            <span className="invisible">←</span>
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-800 text-center whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
          {title}
        </h1>
        <div className="flex justify-end w-6">
          <button
            onClick={onCloseClick}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
