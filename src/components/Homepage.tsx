import React from "react";
import { Header } from "./Header";
import { ServiceCategories } from "./ServiceCategories";
import { BottomNavigation } from "./BottomNavigation";

interface HomepageProps {
  onSearch: () => void;
  onServiceClick: (serviceName: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onSearch,
  onServiceClick,
}) => {
  const handleSearch = () => {
    console.log("Homepage: handleSearch called");
    onSearch();
  };

  const handleServiceClick = (serviceName: string) => {
    console.log("Homepage: handleServiceClick called with:", serviceName);
    onServiceClick(serviceName);
  };

  return (
    <div className="bg-white w-full min-h-screen relative">
      <Header onSearch={handleSearch} />
      <div className="flex flex-col w-full pb-[98px] pt-[99.769px]">
        <ServiceCategories onServiceClick={handleServiceClick} />
      </div>
      <BottomNavigation />
    </div>
  );
};
