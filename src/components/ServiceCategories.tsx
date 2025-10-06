import React from "react";
import { ServiceRow } from "./ServiceRow";
import servicesData from "../data/services.json";

interface ServiceCategoriesProps {
  onServiceClick: (serviceName: string) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  onServiceClick,
}) => {
  return (
    <div className="box-border flex flex-col gap-[40px] items-start pb-[24px] pt-0 px-0 w-full">
      {servicesData.serviceCategories.map((category) => (
        <ServiceRow
          key={category.id}
          categoryName={category.name}
          services={category.services}
          onServiceClick={onServiceClick}
        />
      ))}
    </div>
  );
};
