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
      <div className="grid grid-cols-3 items-center">
        <div className="flex justify-start">
          {showBackButton && onBackClick && (
            <button
              onClick={onBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              ←
            </button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h1>
        <div className="flex justify-end">
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
