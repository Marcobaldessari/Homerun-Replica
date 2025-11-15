import React from "react";
import { Header } from "./Header";
import { ServiceCategories } from "./ServiceCategories";
import { BottomNavigation } from "./BottomNavigation";

interface HomepageProps {
  onSearch: () => void;
  onServiceClick: (serviceName: string, serviceId: string) => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onSearch,
  onServiceClick,
  currentScreen,
  onNavigate,
}) => {
  const handleSearch = () => {
    console.log("Homepage: handleSearch called");
    onSearch();
  };

  const handleServiceClick = (serviceName: string, serviceId: string) => {
    console.log("Homepage: handleServiceClick called with:", serviceName, serviceId);
    onServiceClick(serviceName, serviceId);
  };

  return (
    <div className="bg-white w-full min-h-screen relative">
      <Header onSearch={handleSearch} />
      <div className="flex flex-col w-full pb-[98px] pt-[40px]">
        <ServiceCategories onServiceClick={handleServiceClick} />
      </div>
      <BottomNavigation currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
};
