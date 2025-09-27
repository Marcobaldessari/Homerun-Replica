import React from 'react';
interface CreditCardIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}
export const CreditCardIcon: React.FC<CreditCardIconProps> = ({
  className = '',
  ...props
}) => <svg fill="none" height="24" width="24" viewBox="0 0 24 24" className={className} {...props}>
    <g clipPath="url(#clip0_2407_58)">
      <path clipRule="evenodd" d="M1.75098 6C1.75098 5.30964 2.31062 4.75 3.00098 4.75H21.001C21.6913 4.75 22.251 5.30964 22.251 6V8.25H1.75098V6ZM0.250977 9V6C0.250977 4.48122 1.48219 3.25 3.00098 3.25H21.001C22.5198 3.25 23.751 4.48122 23.751 6V9V18C23.751 19.5188 22.5198 20.75 21.001 20.75H3.00098C1.48219 20.75 0.250977 19.5188 0.250977 18V9ZM22.251 9.75V18C22.251 18.6904 21.6913 19.25 21.001 19.25H3.00098C2.31062 19.25 1.75098 18.6904 1.75098 18V9.75H22.251Z" fill="currentColor" fillRule="evenodd" />
      <path clipRule="evenodd" d="M4.25098 13.25H9.75098V14.75H4.25098V13.25Z" fill="currentColor" fillRule="evenodd" />
    </g>
    <defs>
      <clipPath id="clip0_2407_58">
        <rect fill="white" height="24" transform="translate(0.000976562)" width="24" />
      </clipPath>
    </defs>
  </svg>;