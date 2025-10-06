import React, { useState } from "react";
import { NavigationApp, ScreenType } from "./components/NavigationApp";
import { FloatingNavigation } from "./components/FloatingNavigation";

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("homepage");

  return (
    <div className="App">
      {/* Floating Navigation */}
      <FloatingNavigation
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />

      {/* Main App Content */}
      <NavigationApp
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </div>
  );
}

export default App;
