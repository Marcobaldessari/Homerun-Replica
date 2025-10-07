import React, { useState } from "react";

interface ServiceItemProps {
  name: string;
  image: string;
  onClick: () => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  name,
  image,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    console.log(`ServiceItem: ${name} clicked`);
    onClick();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="flex flex-col gap-[12px] h-[116px] items-start w-[124px] cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
      <div className="border border-[#f0f1f2] border-solid h-[80px] rounded-[8px] w-full relative overflow-hidden">
        {!imageError ? (
          <img
            alt={name}
            className="w-full h-full object-cover rounded-[8px]"
            src={image}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-[#F0F1F2] rounded-[8px]" />
        )}
      </div>
      <p className="font-semibold leading-[22px] text-[#0e0f11] text-[14px] w-full truncate">
        {name}
      </p>
    </div>
  );
};
