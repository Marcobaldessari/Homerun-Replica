import React from 'react';
import { Icon1 } from './Icon1';
import { Icon2 } from './Icon2';
interface HeaderNavigationProps {
  title: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  className?: string;
  'data-id'?: string;
}
export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  title,
  onBackClick,
  onCloseClick,
  showBackButton = true,
  showCloseButton = true,
  className = '',
  'data-id': dataId
}) => {
  return <div data-id={dataId} className={`flex items-center justify-between bg-white px-3 h-16 w-full max-w-lg mx-auto font-sans ${className}`}>
      {/* Left Icon Button */}
      <div className="w-12 flex justify-center">
        {showBackButton && <button onClick={onBackClick} className="flex items-center justify-center w-12 h-12 rounded-3xl p-1 hover:bg-gray-100 transition-colors" aria-label="Go back">
            <Icon1 className="text-gray-900" size={24} />
          </button>}
      </div>
      {/* Center Title */}
      <div className="flex-1 flex justify-center">
        <span className="text-gray-900 font-semibold text-base leading-6 text-center">
          {title}
        </span>
      </div>
      {/* Right Icon Button */}
      <div className="w-12 flex justify-center">
        {showCloseButton && <button onClick={onCloseClick} className="flex items-center justify-center w-12 h-12 rounded-3xl p-1 hover:bg-gray-100 transition-colors" aria-label="Close">
            <Icon2 className="text-gray-900" size={24} />
          </button>}
      </div>
    </div>;
};