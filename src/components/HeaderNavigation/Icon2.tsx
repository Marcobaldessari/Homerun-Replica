import React from 'react';
interface Icon2Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const Icon2: React.FC<Icon2Props> = ({
  size = 24,
  ...props
}) => <svg fill="none" height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path clipRule="evenodd" d="M6.53 5.47 6 4.94 4.94 6l.53.53L10.94 12l-5.47 5.47-.53.53L6 19.06l.53-.53L12 13.06l5.47 5.47.53.53L19.06 18l-.53-.53L13.06 12l5.47-5.47.53-.53L18 4.94l-.53.53L12 10.94 6.53 5.47z" fill="currentColor" fillRule="evenodd" />
  </svg>;