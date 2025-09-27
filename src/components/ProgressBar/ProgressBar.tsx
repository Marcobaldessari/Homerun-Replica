import React from 'react';
export interface ProgressBarProps {
  value?: number;
  max?: number;
  className?: string;
  backgroundColor?: string;
  progressColor?: string;
  height?: 'sm' | 'md' | 'lg';
  'data-id'?: string;
}
export function ProgressBar({
  value = 0,
  max = 100,
  className = '',
  backgroundColor = 'bg-green-100',
  progressColor = 'bg-green-500',
  height = 'sm',
  'data-id': dataId
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  return <div className={`w-full max-w-xs ${className}`} data-id={dataId}>
      <div className={`${backgroundColor} ${heightClasses[height]} rounded-sm overflow-hidden`}>
        <div className={`${progressColor} ${heightClasses[height]} transition-all duration-300 ease-out`} style={{
        width: `${percentage}%`
      }} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} />
      </div>
    </div>;
}