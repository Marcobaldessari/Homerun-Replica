import React, { useState } from "react";
import { RadioButtonScreen } from "./RadioButtonScreen";
import { CheckboxScreen } from "./CheckboxScreen";
import { TextFieldScreen } from "./TextFieldScreen";

export type ScreenType = "radio" | "checkbox" | "text";

interface NavigationAppProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export const NavigationApp: React.FC<NavigationAppProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  const handleBack = () => {
    switch (currentScreen) {
      case "checkbox":
        onScreenChange("radio");
        break;
      case "text":
        onScreenChange("checkbox");
        break;
      case "radio":
      default:
        // Stay on first screen or handle exit
        console.log("Already on first screen");
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "radio":
        return (
          <RadioButtonScreen
            onNext={() => onScreenChange("checkbox")}
            onBack={handleBack}
          />
        );
      case "checkbox":
        return (
          <CheckboxScreen
            onNext={() => onScreenChange("text")}
            onBack={handleBack}
          />
        );
      case "text":
        return (
          <TextFieldScreen
            onNext={() => console.log("Form completed!")}
            onBack={handleBack}
          />
        );
      default:
        return (
          <RadioButtonScreen
            onNext={() => onScreenChange("checkbox")}
            onBack={handleBack}
          />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 justify-center">
      <div className="w-full max-w-md bg-white h-full">{renderScreen()}</div>
    </div>
  );
};
