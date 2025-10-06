import React, { useState } from "react";

export type ScreenType = "homepage" | "search" | "radio" | "checkbox" | "text";

interface FloatingNavigationProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

const screenNames = {
  homepage: "Homepage",
  search: "Search",
  radio: "Radio Buttons (Step 1)",
  checkbox: "Checkboxes (Step 2)",
  text: "Text Field (Step 3)",
};

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleScreenChange = (screen: ScreenType) => {
    onScreenChange(screen);
    setIsExpanded(false); // Collapse after selection
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Expanded Navigation */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 mb-2 min-w-[200px]">
          <div className="flex flex-col space-y-1">
            {(
              [
                "homepage",
                "search",
                "radio",
                "checkbox",
                "text",
              ] as ScreenType[]
            ).map((screen) => (
              <button
                key={screen}
                onClick={() => handleScreenChange(screen)}
                className={`px-3 py-2 text-xs rounded text-left transition-colors ${
                  currentScreen === screen
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {screenNames[screen]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleExpanded}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isExpanded
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 border border-gray-200"
        }`}
      >
        {isExpanded ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
