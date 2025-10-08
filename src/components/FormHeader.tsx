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
      <div className="flex items-center justify-between">
        {showBackButton && onBackClick ? (
          <button
            onClick={onBackClick}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        ) : (
          <div className="w-16"></div>
        )}
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        <button
          onClick={onCloseClick}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
