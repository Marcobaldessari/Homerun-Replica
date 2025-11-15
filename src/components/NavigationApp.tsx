import React, { useState, useEffect } from "react";
import { Homepage } from "./Homepage";
import { SearchPage } from "./SearchPage";
import { RadioButtonScreen } from "./RadioButtonScreen";
import { CheckboxScreen } from "./CheckboxScreen";
import { TextFieldScreen } from "./TextFieldScreen";
import { DynamicQuestionScreen } from "./DynamicQuestionScreen";
import { getQuestionsForService, ServiceQuestion } from "../utils/serviceQuestionsParser";

export type ScreenType =
  | "homepage"
  | "search"
  | "radio"
  | "checkbox"
  | "text"
  | "question"
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
  // State for request creation flow
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string>("");
  const [questions, setQuestions] = useState<ServiceQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  // Load questions when service is selected
  useEffect(() => {
    if (selectedServiceId !== null) {
      const serviceQuestions = getQuestionsForService(selectedServiceId);
      setQuestions(serviceQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  }, [selectedServiceId]);

  const handleBack = () => {
    switch (currentScreen) {
      case "search":
        onScreenChange("homepage");
        break;
      case "question":
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
          onScreenChange("search");
        }
        break;
      case "text":
        if (questions.length > 0) {
          setCurrentQuestionIndex(questions.length - 1);
          onScreenChange("question");
        } else {
          onScreenChange("search");
        }
        break;
      case "homepage":
      default:
        // Stay on first screen or handle exit
        console.log("Already on first screen");
        break;
    }
  };

  const handleServiceSelect = (serviceName: string, serviceId: string) => {
    const serviceIdNum = parseInt(serviceId, 10);
    console.log(
      `NavigationApp: Selected service: ${serviceName} (ID: ${serviceIdNum})`
    );
    setSelectedServiceId(serviceIdNum);
    setSelectedServiceName(serviceName);
    
    const serviceQuestions = getQuestionsForService(serviceIdNum);
    if (serviceQuestions.length > 0) {
      setQuestions(serviceQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      onScreenChange("question");
    } else {
      // If no questions, go directly to notes screen
      onScreenChange("text");
    }
  };

  const handleQuestionAnswer = (answer: string | string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.controlOrder]: answer,
    });

    // Move to next question or notes screen
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, go to notes screen
      onScreenChange("text");
    }
  };

  const handleClose = () => {
    // Reset state
    setSelectedServiceId(null);
    setSelectedServiceName("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
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
      case "question":
        if (questions.length === 0 || currentQuestionIndex >= questions.length) {
          // No questions or out of bounds, go to notes
          return (
            <TextFieldScreen
              serviceName={selectedServiceName || "Service"}
              onNext={() => {
                console.log("Form completed!", answers);
                handleClose();
              }}
              onBack={handleBack}
              onClose={handleClose}
            />
          );
        }
        const currentQuestion = questions[currentQuestionIndex];
        const previousAnswer = answers[currentQuestion.controlOrder];
        return (
          <DynamicQuestionScreen
            question={currentQuestion}
            serviceName={selectedServiceName}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleQuestionAnswer}
            onBack={handleBack}
            onClose={handleClose}
            previousAnswer={previousAnswer}
          />
        );
      case "text":
        return (
          <TextFieldScreen
            serviceName={selectedServiceName || "Service"}
            onNext={() => {
              console.log("Form completed!", answers);
              handleClose();
            }}
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
