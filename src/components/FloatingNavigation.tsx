import React, { useState, useEffect, useRef } from "react";

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

interface Position {
  x: number;
  y: number;
}

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 8 }); // Default middle-top (will be calculated)
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Set initial position to center on component mount
  useEffect(() => {
    const centerX = (window.innerWidth - 48) / 2;
    setPosition({ x: centerX, y: 8 });
    setIsInitialized(true);
  }, []);

  // Handle window resize to keep button centered
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: (window.innerWidth - 48) / 2,
        y: 8,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle keyboard event to toggle visibility with 'H' key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("floatingNavPosition", JSON.stringify(position));
  }, [position]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleScreenChange = (screen: ScreenType) => {
    onScreenChange(screen);
    setIsExpanded(false); // Collapse after selection
  };

  // Drag event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on navigation menu items
    if ((e.target as HTMLElement).closest(".nav-button")) {
      return;
    }

    setIsDragging(true);
    setHasMoved(false);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setHasMoved(true);
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Constrain to viewport bounds
    const maxX = window.innerWidth - 48; // 48px is button width
    const maxY = window.innerHeight - 48; // 48px is button height

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // If we haven't moved much, treat it as a click
    if (!hasMoved) {
      toggleExpanded();
    }
    setHasMoved(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection during drag
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, dragOffset]);

  // Don't render until position is properly calculated or if not visible
  if (!isInitialized || !isVisible) {
    return null;
  }

  return (
    <div
      ref={buttonRef}
      className="fixed z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
    >
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
                className={`nav-button px-3 py-2 text-xs rounded text-left transition-colors ${
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
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? "bg-blue-600 text-white shadow-xl"
            : isExpanded
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:shadow-xl"
        }`}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
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
