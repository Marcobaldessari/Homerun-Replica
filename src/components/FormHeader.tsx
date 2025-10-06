import React from "react";

interface FormHeaderProps {
  title: string;
  onBackClick: () => void;
  onCloseClick: () => void;
}

export const Header: React.FC<FormHeaderProps> = ({
  title,
  onBackClick,
  onCloseClick,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackClick}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
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
