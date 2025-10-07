import React, { useState } from "react";
import { Homepage } from "./Homepage";
import { SearchPage } from "./SearchPage";
import { RadioButtonScreen } from "./RadioButtonScreen";
import { CheckboxScreen } from "./CheckboxScreen";
import { TextFieldScreen } from "./TextFieldScreen";
import { AIInputScreen } from "./AIInputScreen";

export type ScreenType = "homepage" | "search" | "radio" | "checkbox" | "text" | "ai-input";

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
      case "ai-input":
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
            onAIClick={() => {
              console.log(
                "NavigationApp: onAIClick called, changing to AI input screen"
              );
              onScreenChange("ai-input");
            }}
            onServiceClick={handleServiceSelect}
          />
        );
      case "search":
        return (
          <SearchPage
            onBack={handleBack}
            onServiceSelect={handleServiceSelect}
          />
        );
      case "ai-input":
        return (
          <AIInputScreen
            onBack={handleBack}
            onClassificationComplete={(serviceId, categoryId) => {
              console.log(
                `NavigationApp: AI classified to service: ${serviceId}, category: ${categoryId}`
              );
              onScreenChange("radio");
            }}
          />
        );
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
          <Homepage
            onSearch={() => onScreenChange("search")}
            onAIClick={() => onScreenChange("ai-input")}
            onServiceClick={handleServiceSelect}
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
