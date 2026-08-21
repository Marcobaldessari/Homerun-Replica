import React from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";

interface ChangePasswordGateScreenProps {
  onBack: () => void;
}

export const ChangePasswordGateScreen: React.FC<
  ChangePasswordGateScreenProps
> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-24">
      <Header
        title="Change password"
        onBackClick={onBack}
        showCloseButton={false}
      />

      <div className="flex flex-col items-center px-6 pt-6 gap-6">
        <img
          src="/illustrations/CreatePassword.png"
          alt=""
          className="w-[250px] h-[250px] object-contain"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[20px] font-semibold leading-[28px] text-[#0e0f11]">
            Create password
          </h2>
          <p className="text-[14px] leading-[22px] text-[#6a7482]">
            You need to create a password to be able to access your account
            next time.
          </p>
        </div>
      </div>

      <CTA onClick={() => console.log("Create password")}>
        Create password
      </CTA>
    </div>
  );
};
