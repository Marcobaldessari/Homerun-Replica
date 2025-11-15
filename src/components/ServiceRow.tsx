import React, { useRef, useState, useEffect } from "react";
import { ServiceItem } from "./ServiceItem";

export interface Service {
  id: string;
  name: string;
  image: string;
}

export interface ServiceRowProps {
  categoryName: string;
  services: Service[];
  onServiceClick: (serviceName: string, serviceId: string) => void;
}

export const ServiceRow: React.FC<ServiceRowProps> = ({
  categoryName,
  services,
  onServiceClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier

    // If moved more than 5 pixels, consider it a drag
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset hasDragged after a short delay to allow click event to check it
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click events if we just dragged
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

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
        <div
          ref={scrollRef}
          className="flex gap-[16px] items-start overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide w-full cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              name={service.name}
              image={service.image}
              onClick={() => onServiceClick(service.name, service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
