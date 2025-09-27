import React from 'react';
interface MastercardIconProps {
  className?: string;
  style?: React.CSSProperties;
}
export function MastercardIcon({
  className,
  style,
  ...props
}: MastercardIconProps) {
  return <svg fill="none" height="32" width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" className={className} style={style} {...props}>
      <rect fill="#fff" height="31" rx="3.5" stroke="#E3E5E8" width="47" x=".5" y=".5" />
      <path d="m28.971 8.182-8.721.027.28 15.422 8.722-.027-.28-15.422Z" fill="#FF5F00" />
      <path d="M20.821 15.951c-.058-3.136 1.394-5.923 3.672-7.73a10.23 10.23 0 0 0-6.22-2.082c-5.54.016-9.942 4.422-9.841 9.85.1 5.428 4.664 9.807 10.204 9.79a9.954 9.954 0 0 0 6.142-2.12c-2.343-1.765-3.899-4.57-3.957-7.707Z" fill="#EB001B" />
      <path d="M41.07 15.82c.1 5.429-4.303 9.834-9.843 9.851a10.228 10.228 0 0 1-6.22-2.081 9.534 9.534 0 0 0 3.674-7.732c-.057-3.137-1.611-5.914-3.955-7.708a9.957 9.957 0 0 1 6.142-2.12c5.541-.016 10.104 4.389 10.203 9.79Z" fill="#F79E1B" />
    </svg>;
}