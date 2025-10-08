import React from "react";
import { ServiceRow } from "./ServiceRow";
import homepageServicesData from "../data/homepageServices.json";

interface ServiceCategoriesProps {
  onServiceClick: (serviceName: string) => void;
}

const CDN_BASE_URL = "https://cdn.armut.com/images/services/";

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  onServiceClick,
}) => {
  return (
    <div className="box-border flex flex-col gap-[40px] items-start pb-[24px] pt-0 px-0 w-full">
      {homepageServicesData.map((category, index) => {
        // Transform services to include full image URLs
        const servicesWithFullUrls = category.services.map((service) => ({
          id: service.serviceID.toString(),
          name: service.serviceName,
          image: service.imageURL
            ? `${CDN_BASE_URL}${service.imageURL}?tr=w-1200`
            : "",
        }));

        return (
          <ServiceRow
            key={`${category.category}-${index}`}
            categoryName={category.category}
            services={servicesWithFullUrls}
            onServiceClick={onServiceClick}
          />
        );
      })}
    </div>
  );
};
