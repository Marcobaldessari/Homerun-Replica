import React from "react";

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const navItems = [
    {
      id: "homepage",
      label: "Get service",
      iconRegular: "/icons/Search-regular.svg",
      iconFilled: "/icons/Search-filled.svg",
    },
    {
      id: "jobs",
      label: "My jobs",
      iconRegular: "/icons/Job-regular.svg",
      iconFilled: "/icons/Job-filled.svg",
    },
    {
      id: "notifications",
      label: "Notification",
      iconRegular: "/icons/NotificationBell-regular.svg",
      iconFilled: "/icons/NotificationBell-filled.svg",
    },
    {
      id: "settings",
      label: "Settings",
      iconRegular: "/icons/User-regular.svg",
      iconFilled: "/icons/User-filled.svg",
    },
  ];

  return (
    <div className="fixed bg-white border-t border-[#f0f1f2] bottom-0 left-1/2 -translate-x-1/2 max-w-[28rem] w-full z-40 flex gap-[32px] items-center justify-center px-[24px] py-[12px]">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col gap-[4px] items-center"
          >
            <div className="relative size-[24px]">
              <img
                alt={item.label}
                className="block max-w-none size-full"
                src={isActive ? item.iconFilled : item.iconRegular}
              />
            </div>
            <p
              className={`font-medium leading-[20px] text-[12px] ${
                isActive ? "text-[#0e0f11]" : "text-[#6a7482]"
              }`}
            >
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};
