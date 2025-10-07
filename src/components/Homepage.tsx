import React from "react";
import { StatusBar } from "./StatusBar";
import { Header } from "./Header";
import { ServiceCategories } from "./ServiceCategories";
import { BottomNavigation } from "./BottomNavigation";

interface HomepageProps {
  onSearch: () => void;
  onAIClick: () => void;
  onServiceClick: (serviceName: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onSearch,
  onAIClick,
  onServiceClick,
}) => {
  const handleSearch = () => {
    console.log("Homepage: handleSearch called");
    onSearch();
  };

  const handleAIClick = () => {
    console.log("Homepage: handleAIClick called");
    onAIClick();
  };

  const handleServiceClick = (serviceName: string) => {
    console.log("Homepage: handleServiceClick called with:", serviceName);
    onServiceClick(serviceName);
  };

  return (
    <div className="bg-white w-full min-h-screen relative">
      <StatusBar />
      <Header onSearch={handleSearch} />
      <div className="flex flex-col w-full pb-[98px] pt-[99.769px]">
        <div className="px-4 pt-4 pb-6">
          <button
            onClick={handleAIClick}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Describe Your Need</div>
                  <div className="text-sm text-blue-100">
                    Let AI help you find the right service
                  </div>
                </div>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
        <ServiceCategories onServiceClick={handleServiceClick} />
      </div>
      <BottomNavigation />
    </div>
  );
};
