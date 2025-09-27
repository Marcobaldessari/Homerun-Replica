import React from 'react';
interface Icon1Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const Icon1: React.FC<Icon1Props> = ({
  size = 24,
  ...props
}) => <svg fill="none" height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path clipRule="evenodd" d="m12.53 5.53.53-.53L12 3.94l-.53.53-7 7v1.06l7 7 .53.53L13.06 19l-.53-.53-5.72-5.72h13.94v-1.5H6.81l5.72-5.72z" fill="currentColor" fillRule="evenodd" />
  </svg>;