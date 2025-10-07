import React, { useState } from "react";
import { StatusBar } from "./StatusBar";
import { supabase } from "../lib/supabase";

interface AIInputScreenProps {
  onBack: () => void;
  onClassificationComplete: (serviceId: string, categoryId: string) => void;
}

export const AIInputScreen: React.FC<AIInputScreenProps> = ({
  onBack,
  onClassificationComplete,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setError("Please describe what you need");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/classify-service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            userInput: userInput.trim(),
            sessionId: generateSessionId(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Classification failed");
      }

      const result = await response.json();

      onClassificationComplete(
        result.classification.serviceId,
        result.classification.categoryId
      );
    } catch (err) {
      console.error("Classification error:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <StatusBar />

      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          Describe Your Need
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            What do you need help with?
          </h2>
          <p className="text-gray-600">
            Tell us about your problem in your own words, and we'll help you find the right service.
          </p>
        </div>

        <div className="mb-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Example: My kitchen sink is leaking and water is pooling under the cabinet"
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Tips for best results:
          </h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Be specific about the problem</li>
            <li>• Mention the location (kitchen, bathroom, yard, etc.)</li>
            <li>• Include any relevant details</li>
          </ul>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !userInput.trim()}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
            isLoading || !userInput.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Finding the right service...
            </span>
          ) : (
            "Find My Service"
          )}
        </button>
      </div>
    </div>
  );
};
