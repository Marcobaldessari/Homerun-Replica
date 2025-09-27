import React from 'react';
interface VisaIconProps {
  className?: string;
  style?: React.CSSProperties;
}
export function VisaIcon({
  className,
  style,
  ...props
}: VisaIconProps) {
  return <svg fill="none" height="32" width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" className={className} style={style} {...props}>
      <rect fill="#fff" height="31" rx="3.5" stroke="#E3E5E8" width="47" x=".5" y=".5" />
      <path d="M41.01 10.17h-2.5c-.75 0-1.33.23-1.67.97l-4.76 10.69h3.36s.58-1.43.7-1.77h4.12c.11.4.4 1.71.4 1.71h3.02l-2.67-11.6Zm-3.94 7.49c.29-.69 1.27-3.26 1.27-3.26 0 .06.3-.69.4-1.09l.24 1.03.76 3.37h-2.67v-.05ZM32.3 18c0 2.4-2.2 4-5.62 4a9.64 9.64 0 0 1-3.6-.63l.47-2.63.4.17c1.05.46 1.75.63 3.02.63.93 0 1.92-.34 1.92-1.14 0-.51-.41-.86-1.69-1.43-1.21-.57-2.84-1.48-2.84-3.14 0-2.29 2.26-3.83 5.45-3.83a7.5 7.5 0 0 1 2.9.51l-.46 2.52-.23-.23a6.32 6.32 0 0 0-2.44-.46c-1.22.06-1.8.57-1.8 1.03 0 .52.7.92 1.8 1.43 1.86.86 2.73 1.83 2.73 3.2Z" fill="#3362AB" />
      <path d="m4 10.29.06-.23h4.99c.7 0 1.22.23 1.39.97l1.1 5.14C10.44 13.43 7.9 11.2 4 10.3Z" fill="#F9B50B" />
      <path d="m18.56 10.17-5.05 11.6H10.1l-2.9-9.71a12.66 12.66 0 0 1 4.47 4.8l.34 1.2 3.14-7.95h3.42v.06ZM19.9 10.11h3.19l-2.03 11.66h-3.2l2.04-11.66Z" fill="#3362AB" />
    </svg>;
}