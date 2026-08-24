import React, { useState, useEffect } from "react";
import { Homepage } from "./Homepage";
import { SearchPage } from "./SearchPage";
import { RadioButtonScreen } from "./RadioButtonScreen";
import { CheckboxScreen } from "./CheckboxScreen";
import { TextFieldScreen } from "./TextFieldScreen";
import { DynamicQuestionScreen } from "./DynamicQuestionScreen";
import { RequestFunnel } from "./RequestFunnel";
import { ExitConfirmationModal } from "./ExitConfirmationModal";
import { JobsArea } from "./JobsArea";
import { SettingsArea } from "./SettingsArea";
import { NotificationsGateScreen } from "./NotificationsGateScreen";
import { getQuestionsForService, ServiceQuestion } from "../utils/serviceQuestionsParser";

export type ScreenType =
  | "homepage"
  | "search"
  | "radio"
  | "checkbox"
  | "text"
  | "question"
  | "funnel"
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
  const [showExitModal, setShowExitModal] = useState(false);

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
      case "funnel":
        onScreenChange("text");
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

  // Ask for confirmation before actually closing the wizard.
  const requestExit = () => setShowExitModal(true);
  const exitVariant: "firstStep" | "midFlow" =
    currentScreen === "question" && currentQuestionIndex === 0
      ? "firstStep"
      : "midFlow";
  const handleExitConfirm = () => {
    setShowExitModal(false);
    handleClose();
  };
  const handleExitDismiss = () => setShowExitModal(false);

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
            onClose={requestExit}
          />
        );
      case "checkbox":
        return (
          <CheckboxScreen
            onNext={() => onScreenChange("text")}
            onBack={handleBack}
            onClose={requestExit}
          />
        );
      case "question": {
        if (questions.length === 0 || currentQuestionIndex >= questions.length) {
          // No questions or out of bounds, go to notes
          return (
            <TextFieldScreen
              serviceName={selectedServiceName || "Service"}
              onNext={() => onScreenChange("funnel")}
              onBack={handleBack}
              onClose={requestExit}
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
            onClose={requestExit}
            previousAnswer={previousAnswer}
          />
        );
      }
      case "text":
        return (
          <TextFieldScreen
            serviceName={selectedServiceName || "Service"}
            onNext={() => onScreenChange("funnel")}
            onBack={handleBack}
            onClose={requestExit}
          />
        );
      case "funnel":
        return (
          <RequestFunnel
            serviceName={selectedServiceName || "Service"}
            answers={answers}
            onComplete={() => {
              console.log("Request created!", answers);
              handleClose();
            }}
            onBack={handleBack}
            onClose={requestExit}
          />
        );
      case "notifications":
        return (
          <NotificationsGateScreen
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
          />
        );
      case "jobs":
        return (
          <JobsArea
            currentScreen={currentScreen}
            onNavigate={onScreenChange}
            onServiceClick={handleServiceSelect}
          />
        );
      case "settings":
        return (
          <SettingsArea
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
      {showExitModal && (
        <ExitConfirmationModal
          variant={exitVariant}
          onExit={handleExitConfirm}
          onContinue={handleExitDismiss}
        />
      )}
    </div>
  );
};
