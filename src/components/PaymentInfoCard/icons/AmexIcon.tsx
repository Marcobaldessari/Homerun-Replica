import React from 'react';
interface AmexIconProps {
  className?: string;
  style?: React.CSSProperties;
}
export function AmexIcon({
  className,
  style,
  ...props
}: AmexIconProps) {
  return <svg fill="none" height="32" width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" className={className} style={style} {...props}>
      <rect fill="#1C88E5" height="31" rx="3.5" stroke="#1C88E5" width="47" x=".5" y=".5" />
      <path clipRule="evenodd" d="M29.76 25.98V15.39l18.24.02v2.92l-2.1 2.33L48 23v2.98h-3.36l-1.8-2.04L41.08 26l-11.3-.02Z" fill="#fff" fillRule="evenodd" />
      <path clipRule="evenodd" d="M30.98 24.81v-8.25h6.78v1.9h-4.59v1.29h4.48v1.87h-4.48v1.27h4.59v1.92h-6.78Z" fill="#1C88E5" fillRule="evenodd" />
      <path clipRule="evenodd" d="m37.73 24.81 3.75-4.13-3.75-4.12h2.9l2.3 2.61 2.3-2.61H48v.06l-3.67 4.06L48 24.7v.11h-2.8l-2.34-2.64-2.3 2.64h-2.83Z" fill="#1C88E5" fillRule="evenodd" />
      <path clipRule="evenodd" d="M30.61 6h4.4l1.54 3.62V6h5.43l.94 2.71.94-2.71H48v10.58H26.1L30.6 6Z" fill="#fff" fillRule="evenodd" />
      <path clipRule="evenodd" d="M31.44 7.15 27.9 15.4h2.43l.67-1.65h3.63l.66 1.65h2.5l-3.54-8.25h-2.8Zm.3 4.75 1.07-2.63 1.07 2.63h-2.13Z" fill="#1C88E5" fillRule="evenodd" />
      <path clipRule="evenodd" d="M37.76 15.4V7.15l3.42.01 1.76 5.07 1.77-5.08H48v8.25l-2.13.02V9.75l-2 5.65h-1.93L39.9 9.73v5.67h-2.15Z" fill="#1C88E5" fillRule="evenodd" />
      <rect fill="#FFEAB4" height="6" rx="1" width="8" x="6" y="20" />
      <path clipRule="evenodd" d="M9 23v-3H8v1.5H6v1h2v1H6v1h2V26h1v-3Zm3 1.5h2v-1h-2v-1h2v-1h-2V20h-1v6h1v-1.5Z" fill="#FFCD4C" fillRule="evenodd" />
    </svg>;
}