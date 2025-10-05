import React from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-40 h-1 bg-[#c6f1d1] rounded-lg overflow-hidden">
      <div
        className="h-full bg-[#2cb34f] rounded-l-lg"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

