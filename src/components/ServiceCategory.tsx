import React from "react";
import { ServiceItem } from "./ServiceItem";

interface ServiceCategoryProps {
  title: string;
  onServiceClick: (serviceName: string) => void;
}

export const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  title,
  onServiceClick,
}) => {
  // Sample service names
  const services = [
    "Deep Cleaning",
    "Regular Cleaning",
    "Window Cleaning",
    "Carpet Cleaning",
    "Move-in/Move-out",
    "Office Cleaning",
  ];

  return (
    <div className="bg-white box-border flex flex-col gap-[24px] h-[160px] items-start overflow-x-auto overflow-y-clip pl-[24px] pr-0 py-0 w-full">
      <div className="flex flex-col gap-[16px] h-[228px] items-start overflow-clip w-full">
        {/* Category Header */}
        <div className="flex gap-[8px] items-center overflow-clip w-full">
          <p className="basis-0 font-semibold grow leading-[28px] min-h-px min-w-px text-[#0e0f11] text-[20px]">
            {title}
          </p>
        </div>
        {/* Services Row */}
        <div className="basis-0 flex gap-[16px] grow items-start min-h-px min-w-px overflow-clip">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              name={service}
              onClick={() => onServiceClick(service)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
