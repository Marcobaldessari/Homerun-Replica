import React from "react";
import { Header } from "./FormHeader";
import { Job } from "../data/jobs";

interface JobDetailsScreenProps {
  job: Job;
  onBack: () => void;
}

interface QAItem {
  question: string;
  answer: string;
}

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({
  job,
  onBack,
}) => {
  const qaItems: QAItem[] = [
    ...job.answers,
    {
      question: "What are the details of your job request?",
      answer: job.description,
    },
    { question: "Request number", answer: job.requestNumber },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header title="Details" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow">
        {/* Service heading + quick facts */}
        <div className="flex flex-col gap-2 px-6 pb-6">
          <h1 className="text-xl font-semibold text-[#0e0f11] leading-7">
            {job.serviceName}
          </h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/icons/Calendar.svg"
                  alt=""
                  className="max-w-full max-h-full"
                />
              </div>
              <p className="text-sm text-[#0e0f11] leading-[22px]">
                {job.dateTimeLabel}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/icons/LocationPin.svg"
                  alt=""
                  className="max-w-full max-h-full"
                />
              </div>
              <p className="text-sm text-[#0e0f11] leading-[22px]">
                {job.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/icons/PhoneCall.svg"
                  alt=""
                  className="max-w-full max-h-full"
                />
              </div>
              <p className="text-sm text-[#0e0f11] leading-[22px]">
                {job.contactPreferenceLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#e3e5e8]" />

        {/* Details section heading */}
        <div className="px-6 pt-6">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Details
          </h2>
        </div>

        {/* Q&A list */}
        <div className="flex flex-col">
          {qaItems.map((item, index) => (
            <div
              key={`${item.question}-${index}`}
              className={`flex flex-col gap-2 px-6 pt-6 ${
                index === qaItems.length - 1 ? "pb-6" : ""
              }`}
            >
              <p className="text-base font-semibold text-[#0e0f11]">
                {item.question}
              </p>
              <p className="text-base text-[#6a7482]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};

export default JobDetailsScreen;
