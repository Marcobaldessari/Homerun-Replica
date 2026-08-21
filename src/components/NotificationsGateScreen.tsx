import React from "react";
import { CTA } from "./CTA";
import { BottomNavigation } from "./BottomNavigation";

interface NotificationsGateScreenProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

/**
 * "Notifications" tab content (Figma node 5327:83274,
 * "Notifications - verify phone lockscreen"). There is no real notifications
 * list in scope for this prototype — this phone-verification gate screen IS
 * the entire content of the tab, not an overlay on top of something else.
 */
export const NotificationsGateScreen: React.FC<NotificationsGateScreenProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const handleVerifyNow = () => {
    console.log("NotificationsGateScreen: Verify now clicked");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Title bar */}
      <div className="bg-white px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          Notifications
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center flex-1 px-6 pt-6 pb-[190px]">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/illustrations/PhoneVerification.png"
            alt=""
            className="w-[250px] h-[250px]"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-xl font-semibold text-[#0e0f11]">
              Phone number verification
            </h2>
            <p className="text-sm leading-[22px] text-[#6a7482]">
              To contact service providers, we need to verify your phone
              number.
            </p>
          </div>
        </div>

        {/*
          CTA renders as a `fixed bottom-0` bar (see CTA.tsx) — on every other
          screen that's fine because nothing else occupies the viewport's
          bottom edge. Here BottomNavigation is also `fixed bottom-0` (with a
          higher z-index), so without an offset the tab bar would completely
          cover the button. Rather than fork CTA's shared layout for one
          screen, nudge just this instance up by the tab bar's height via an
          arbitrary-variant override on its root div.
        */}
        <div className="w-full pt-6 [&>div]:bottom-[73px]">
          <CTA onClick={handleVerifyNow}>Verify now</CTA>
        </div>
      </div>

      <BottomNavigation currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
};
