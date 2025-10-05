import React, { useState } from "react";
import { NavigationApp, ScreenType } from "./components/NavigationApp";

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("radio");

  const screenNames = {
    radio: "Radio Buttons (Step 1)",
    checkbox: "Checkboxes (Step 2)",
    text: "Text Field (Step 3)",
  };

  return (
    <div className="App">
      {/* Navigation Controls for Testing */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-2 flex justify-center space-x-2">
        {(["radio", "checkbox", "text"] as ScreenType[]).map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-3 py-1 text-xs rounded ${
              currentScreen === screen
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {screenNames[screen]}
          </button>
        ))}
      </div>

      {/* Main App Content */}
      <div className="pt-12">
        <NavigationApp
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
        />
      </div>
    </div>
  );
}

export default App;
