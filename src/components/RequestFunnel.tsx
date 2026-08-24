import React, { useState } from "react";
import { AttachmentsStep } from "./AttachmentsStep";
import { LocationStep } from "./LocationStep";
import { WhenStep, WhenStepValue } from "./WhenStep";
import {
  ContactPreferenceStep,
  ContactPreferenceValue,
} from "./ContactPreferenceStep";
import {
  AuthEmailPasswordScreen,
  AuthEmailPasswordValue,
} from "./AuthEmailPasswordScreen";
import { AuthPhoneScreen } from "./AuthPhoneScreen";
import { AuthEmailOTPScreen } from "./AuthEmailOTPScreen";

type FunnelStep = "attachments" | "location" | "when" | "contact" | "auth";

const FUNNEL_STEP_ORDER: FunnelStep[] = [
  "attachments",
  "location",
  "when",
  "contact",
  "auth",
];

// Which login screen is shown for the "auth" step. Guests land on
// email+password by default and can switch to phone or a passwordless
// email code from there. There's no dedicated phone-OTP screen in this
// pass, so the phone path completes the request directly after the
// number is captured (see figma-design-to-code build notes).
type AuthMethod = "emailPassword" | "emailOtp" | "phone";

interface RequestFunnelProps {
  serviceName: string;
  answers: Record<number, string | string[]>;
  onComplete: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const RequestFunnel: React.FC<RequestFunnelProps> = ({
  serviceName,
  answers,
  onComplete,
  onBack,
  onClose,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("emailPassword");
  const [pendingEmail, setPendingEmail] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [address, setAddress] = useState("");
  const [when, setWhen] = useState<WhenStepValue | null>(null);
  const [contact, setContact] = useState<ContactPreferenceValue | null>(null);

  const step = FUNNEL_STEP_ORDER[stepIndex];
  const progressValue =
    90 + Math.round(((stepIndex + 1) / FUNNEL_STEP_ORDER.length) * 10);

  const goNext = () =>
    setStepIndex((i) => Math.min(i + 1, FUNNEL_STEP_ORDER.length - 1));

  const goBack = () => {
    if (stepIndex === 0) {
      onBack();
    } else {
      setStepIndex((i) => i - 1);
    }
  };

  const finish = (auth: AuthEmailPasswordValue | { phone: string } | { otp: string }) => {
    console.log("Request created", {
      serviceName,
      answers,
      photos: photos.length,
      address,
      when,
      contact,
      auth,
    });
    onComplete();
  };

  switch (step) {
    case "attachments":
      return (
        <AttachmentsStep
          serviceName={serviceName}
          progressValue={progressValue}
          onNext={(files) => {
            setPhotos(files);
            goNext();
          }}
          onBack={goBack}
          onClose={onClose}
        />
      );

    case "location":
      return (
        <LocationStep
          serviceName={serviceName}
          progressValue={progressValue}
          onNext={(selectedAddress) => {
            setAddress(selectedAddress);
            goNext();
          }}
          onBack={goBack}
          onClose={onClose}
        />
      );

    case "when":
      return (
        <WhenStep
          serviceName={serviceName}
          progressValue={progressValue}
          onNext={(value) => {
            setWhen(value);
            goNext();
          }}
          onBack={goBack}
          onClose={onClose}
        />
      );

    case "contact":
      return (
        <ContactPreferenceStep
          serviceName={serviceName}
          progressValue={progressValue}
          onNext={(value) => {
            setContact(value);
            goNext();
          }}
          onBack={goBack}
          onClose={onClose}
        />
      );

    case "auth":
      if (authMethod === "phone") {
        return (
          <AuthPhoneScreen
            serviceName={serviceName}
            progressValue={progressValue}
            onNext={(phone) => finish({ phone })}
            onBack={() => setAuthMethod("emailPassword")}
            onClose={onClose}
            onSwitchToEmailLogin={() => setAuthMethod("emailPassword")}
          />
        );
      }
      if (authMethod === "emailOtp") {
        return (
          <AuthEmailOTPScreen
            serviceName={serviceName}
            progressValue={progressValue}
            email={pendingEmail || undefined}
            onNext={(otp) => finish({ otp })}
            onBack={() => setAuthMethod("emailPassword")}
            onClose={onClose}
            onSwitchToPassword={() => setAuthMethod("emailPassword")}
          />
        );
      }
      return (
        <AuthEmailPasswordScreen
          serviceName={serviceName}
          progressValue={progressValue}
          onNext={(value) => finish(value)}
          onBack={goBack}
          onClose={onClose}
          onLoginWithoutPassword={(email) => {
            setPendingEmail(email);
            setAuthMethod("emailOtp");
          }}
          onSwitchToPhoneLogin={() => setAuthMethod("phone")}
        />
      );

    default:
      return null;
  }
};
