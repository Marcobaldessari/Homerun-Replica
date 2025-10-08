import React, { useState } from "react";
import { Homepage } from "./Homepage";
import { SearchPage } from "./SearchPage";
import { RadioButtonScreen } from "./RadioButtonScreen";
import { CheckboxScreen } from "./CheckboxScreen";
import { TextFieldScreen } from "./TextFieldScreen";

export type ScreenType =
  | "homepage"
  | "search"
  | "radio"
  | "checkbox"
  | "text"
  | "notifications"
  | "jobs"
  | "settings";

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
      case "search":
        onScreenChange("homepage");
        break;
      case "radio":
        onScreenChange("search");
        break;
      case "checkbox":
        onScreenChange("radio");
        break;
      case "text":
        onScreenChange("checkbox");
        break;
      case "homepage":
      default:
        // Stay on first screen or handle exit
        console.log("Already on first screen");
        break;
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    console.log(
      `NavigationApp: Selected service: ${serviceName}, changing to radio screen`
    );
    onScreenChange("radio");
  };

  const handleClose = () => {
    onScreenChange("homepage");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "homepage":
        return (
          <Homepage
            onSearch={() => {
              console.log(
                "NavigationApp: onSearch called, changing to search screen"
              );
              onScreenChange("search");
            }}
            onServiceClick={handleServiceSelect}
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
          />
        );
      case "search":
        return (
          <SearchPage
            onBack={handleBack}
            onServiceSelect={handleServiceSelect}
          />
        );
      case "radio":
        return (
          <RadioButtonScreen
            onNext={() => onScreenChange("checkbox")}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      case "checkbox":
        return (
          <CheckboxScreen
            onNext={() => onScreenChange("text")}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      case "text":
        return (
          <TextFieldScreen
            onNext={() => console.log("Form completed!")}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      case "notifications":
        return (
          <Homepage
            onSearch={() => onScreenChange("search")}
            onServiceClick={handleServiceSelect}
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
          />
        );
      case "jobs":
        return (
          <Homepage
            onSearch={() => onScreenChange("search")}
            onServiceClick={handleServiceSelect}
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
          />
        );
      case "settings":
        return (
          <Homepage
            onSearch={() => onScreenChange("search")}
            onServiceClick={handleServiceSelect}
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
          />
        );
      default:
        return (
          <Homepage
            onSearch={() => onScreenChange("search")}
            onServiceClick={handleServiceSelect}
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
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
