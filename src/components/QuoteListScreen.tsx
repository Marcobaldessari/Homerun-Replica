import React from "react";
import { Header } from "./FormHeader";
import { Job } from "../data/jobs";

interface QuoteListScreenProps {
  job: Job;
  onBack: () => void;
  onSeeDetails: () => void; // the "See details" link
  onOpenChat: (quoteId: string) => void; // tapping a quote card
}

export const QuoteListScreen: React.FC<QuoteListScreenProps> = ({
  job,
  onBack,
  onSeeDetails,
  onOpenChat,
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header
        title={job.serviceName}
        onBackClick={onBack}
        showCloseButton={false}
      />

      <div className="flex flex-col flex-grow px-6 pt-6 gap-4">
        {/* Intro + see details link */}
        <div className="flex flex-col gap-1">
          <p className="text-base text-[#6a7482] leading-6">
            Here you can see all the quotes for your request.
          </p>
          <button
            type="button"
            onClick={onSeeDetails}
            className="flex items-center gap-1 w-fit"
          >
            <span className="text-sm font-semibold text-[#0e0f11] underline">
              See details
            </span>
            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              <img
                src="/icons/ArrowRight.svg"
                alt=""
                className="max-w-full max-h-full"
              />
            </div>
          </button>
        </div>

        {/* Quote cards */}
        <div className="flex flex-col gap-4 pb-6">
          {job.quotes.length === 0 ? (
            <p className="text-sm text-[#6a7482]">
              No quotes have come in yet.
            </p>
          ) : (
            job.quotes.map((quote) => (
              <button
                key={quote.id}
                type="button"
                onClick={() => onOpenChat(quote.id)}
                className="flex flex-col items-start gap-4 w-full p-6 rounded-lg bg-white border border-[#f0f1f2] shadow-[0px_2px_2px_rgba(0,0,0,0.04)] text-left"
              >
                <div className="flex items-start gap-2 w-full">
                  <div className="flex flex-1 items-center gap-2 min-w-0">
                    <img
                      src={quote.avatarUrl}
                      alt={quote.proName}
                      className="w-10 h-10 rounded-full border border-[#e3e5e8] object-cover flex-shrink-0"
                    />
                    <div className="flex flex-1 flex-col min-w-0">
                      <p className="text-sm font-semibold text-[#0e0f11] truncate">
                        {quote.proName}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 flex-shrink-0 flex items-center justify-center">
                          <img
                            src="/icons/StarFilled.svg"
                            alt=""
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <span className="text-sm font-semibold text-[#0e0f11]">
                          {quote.rating}
                        </span>
                        <span className="text-sm text-[#6a7482]">
                          ({quote.reviewCount} Reviews)
                        </span>
                      </div>
                      <p className="text-sm text-[#6a7482] truncate">
                        {quote.message}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 bg-[#f0f1f2] rounded px-2 py-1">
                    <span className="text-xs font-semibold text-[#0e0f11] whitespace-nowrap">
                      {quote.priceLabel}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};

export default QuoteListScreen;
