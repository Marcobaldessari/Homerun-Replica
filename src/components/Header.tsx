import React from "react";

interface HeaderProps {
  title: string;
  onBackClick: () => void;
  onCloseClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackClick,
  onCloseClick,
}) => {
  return (
    <div className="bg-white h-12 flex items-center justify-between px-3">
      <button
        onClick={onBackClick}
        className="w-8 h-8 flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
            fill="#0E0F11"
          />
        </svg>
      </button>
      <h1 className="text-[#292d33] font-semibold">{title}</h1>
      <button
        onClick={onCloseClick}
        className="w-8 h-8 flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
            fill="#0E0F11"
          />
          <path
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#0E0F11"
          />
        </svg>
      </button>
    </div>
  );
};

