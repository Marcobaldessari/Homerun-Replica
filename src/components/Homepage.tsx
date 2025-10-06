import React from 'react';
import { Header } from './Header';
import { ServiceCategories } from './ServiceCategories';
import { BottomNavigation } from './BottomNavigation';

interface HomepageProps {
  onSearch: () => void;
  onServiceClick: (serviceName: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onSearch, onServiceClick }) => {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <div className="flex flex-col w-full pb-[98px]">
        <Header onSearch={onSearch} />
        <ServiceCategories onServiceClick={onServiceClick} />
      </div>
      <BottomNavigation />
    </div>
  );
};
