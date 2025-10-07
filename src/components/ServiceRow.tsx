import React from "react";
import { ServiceItem } from "./ServiceItem";
import { getServiceImageUrl } from "../utils/serviceParser";

export interface Service {
  id: string;
  name: string;
  image: string;
}

export interface ServiceRowProps {
  categoryName: string;
  services: Service[];
  onServiceClick: (serviceName: string) => void;
}

export const ServiceRow: React.FC<ServiceRowProps> = ({
  categoryName,
  services,
  onServiceClick,
}) => {
  return (
    <div className="bg-white box-border flex flex-col gap-[24px] items-start pl-[24px] pr-0 py-0 w-full">
      <div className="flex flex-col gap-[16px] items-start w-full">
        {/* Category Header */}
        <div className="flex gap-[8px] items-center w-full">
          <p className="font-semibold leading-[28px] text-[#0e0f11] text-[20px]">
            {categoryName}
          </p>
        </div>
        {/* Services Row */}
        <div className="flex gap-[16px] items-start overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide w-full">
          {services.map((service) => {
            // Try to get image from CSV, fallback to service.image
            const csvImageUrl = getServiceImageUrl(service.name);
            const imageUrl = csvImageUrl || service.image;

            // Debug logging
            console.log(
              `Service: ${service.name}, CSV URL: ${csvImageUrl}, Final URL: ${imageUrl}`
            );

            return (
              <ServiceItem
                key={service.id}
                name={service.name}
                image={imageUrl}
                onClick={() => onServiceClick(service.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
