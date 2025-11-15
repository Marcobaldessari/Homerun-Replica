import React, { useState, useEffect } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";
import { SeasonalityBanner } from "./SeasonalityBanner";
import { ServiceQuestion } from "../utils/serviceQuestionsParser";
import { getAnswerOptionsForQuestion } from "../utils/serviceAnswersParser";

interface DynamicQuestionScreenProps {
  question: ServiceQuestion;
  serviceName: string;
  questionIndex: number;
  totalQuestions: number;
  onNext: (answer: string | string[]) => void;
  onBack: () => void;
  onClose: () => void;
  options?: string[]; // Optional: if not provided, will need to be generated
  previousAnswer?: string | string[]; // Previous answer to restore state
}

export const DynamicQuestionScreen: React.FC<DynamicQuestionScreenProps> = ({
  question,
  serviceName,
  questionIndex,
  totalQuestions,
  onNext,
  onBack,
  onClose,
  options = [],
  previousAnswer,
}) => {
  const isRadio = question.controlTypeId === 6;
  const isCheckbox = question.controlTypeId === 5;

  // Initialize state from previous answer if available
  const getInitialRadio = (): string | null => {
    if (previousAnswer && typeof previousAnswer === "string") {
      return previousAnswer;
    }
    return null;
  };

  const getInitialCheckboxes = (): Set<string> => {
    if (previousAnswer && Array.isArray(previousAnswer)) {
      return new Set(previousAnswer);
    }
    return new Set();
  };

  // For radio buttons
  const [selectedRadio, setSelectedRadio] = useState<string | null>(
    getInitialRadio()
  );

  // For checkboxes
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<string>>(
    getInitialCheckboxes()
  );

  // Update state when previousAnswer changes (e.g., when navigating back)
  useEffect(() => {
    if (isRadio) {
      const newValue =
        previousAnswer && typeof previousAnswer === "string"
          ? previousAnswer
          : null;
      setSelectedRadio(newValue);
    } else if (isCheckbox) {
      const newValue =
        previousAnswer && Array.isArray(previousAnswer)
          ? new Set<string>(previousAnswer)
          : new Set<string>();
      setSelectedCheckboxes(newValue);
    }
  }, [previousAnswer, question.controlOrder, isRadio, isCheckbox]);

  // Get options from CSV, fallback to provided options or defaults
  const getQuestionOptions = (): string[] => {
    // First try to get from CSV
    const csvOptions = getAnswerOptionsForQuestion(
      question.controlServiceId,
      question.controlOrder
    );

    if (csvOptions.length > 0) {
      return csvOptions;
    }

    // Fallback to provided options
    if (options.length > 0) {
      return options;
    }

    // Last resort: default yes/no
    return ["Yes", "No"];
  };

  const questionOptions = getQuestionOptions();
  const progressValue = ((questionIndex + 1) / (totalQuestions + 1)) * 100; // +1 for notes screen

  const handleNextClick = () => {
    if (isRadio && selectedRadio) {
      onNext(selectedRadio);
    } else if (isCheckbox && selectedCheckboxes.size > 0) {
      onNext(Array.from(selectedCheckboxes));
    } else if (!question.required) {
      // Allow proceeding if question is not required
      onNext(isRadio ? "" : []);
    }
  };

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
  };

  const toggleCheckbox = (value: string) => {
    const newSet = new Set(selectedCheckboxes);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSelectedCheckboxes(newSet);
  };

  const CheckedIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#2CB34F" />
      <path
        d="M10.5 16.0711L6.42893 12L7.84315 10.5858L10.5 13.2426L16.1569 7.58578L17.5711 9L10.5 16.0711Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header
        title={serviceName}
        onBackClick={onBack}
        onCloseClick={onClose}
        showBackButton={questionIndex > 0}
      />

      {/* Progress Bar */}
      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={progressValue} />
      </div>

      {/* Price Range */}
      <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />

      {/* Seasonality Banner */}
      <SeasonalityBanner />

      {/* Form Content */}
      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            {question.label}
          </h2>
          {question.description && (
            <p className="text-sm text-[#6a7482] mt-2">
              {question.description}
            </p>
          )}
        </div>
        <div className="px-6">
          {isRadio && (
            <div className="mb-4">
              {questionOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-start gap-2 mb-5 last:mb-0 cursor-pointer"
                  onClick={() => handleRadioChange(option)}
                >
                  <input
                    type="radio"
                    name={`question-${question.controlServiceId}-${question.controlOrder}`}
                    value={option}
                    checked={selectedRadio === option}
                    onChange={() => handleRadioChange(option)}
                    className="sr-only"
                  />
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full border ${
                        selectedRadio === option
                          ? "border-[#2cb34f]"
                          : "border-[#b8c0ca]"
                      }`}
                    >
                      {selectedRadio === option && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2cb34f]"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-base text-[#0e0f11]">{option}</span>
                </label>
              ))}
            </div>
          )}

          {isCheckbox && (
            <div className="space-y-5">
              {questionOptions.map((option) => (
                <button
                  key={option}
                  className="flex items-center w-full"
                  onClick={() => toggleCheckbox(option)}
                >
                  <div className="mr-2">
                    {selectedCheckboxes.has(option) ? (
                      <CheckedIcon />
                    ) : (
                      <div className="w-6 h-6 border border-[#b8c0ca] rounded flex items-center justify-center bg-white" />
                    )}
                  </div>
                  <span className="text-[16px] text-[#0e0f11]">{option}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <CTA
        onClick={handleNextClick}
        disabled={
          question.required &&
          ((isRadio && !selectedRadio) ||
            (isCheckbox && selectedCheckboxes.size === 0))
        }
      >
        Next
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
