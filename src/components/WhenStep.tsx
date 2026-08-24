import React, { useMemo, useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

export interface WhenStepValue {
  option:
    | "certain-time"
    | "within-two-months"
    | "within-six-months"
    | "just-looking";
  date?: string;
  time?: string;
}

interface WhenStepProps {
  serviceName: string;
  progressValue: number;
  onNext: (value: WhenStepValue) => void;
  onBack: () => void;
  onClose: () => void;
}

type TimingOption = WhenStepValue["option"];

const OPTIONS: { id: TimingOption; label: string }[] = [
  { id: "certain-time", label: "A certain time (within 3 weeks)" },
  { id: "within-two-months", label: "Within two months" },
  { id: "within-six-months", label: "Within six months" },
  { id: "just-looking", label: "I'm just looking at the price" },
];

// Mock date list: the next 14 days starting today. Static/local - no calendar API.
const getMockDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(
      d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }
  return dates;
};

// Mock hourly time slots.
const MOCK_TIMES: string[] = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
);

type ActiveSheet = "date" | "time" | null;

const Radio: React.FC<{ selected: boolean }> = ({ selected }) => (
  <div
    className={`relative w-6 h-6 rounded-full flex-shrink-0 ${
      selected ? "bg-[#2cb34f]" : "bg-white border border-[#b8c0ca]"
    }`}
  >
    {selected && (
      <div className="absolute inset-[29.17%] rounded-full bg-white" />
    )}
  </div>
);

const BottomSheet: React.FC<{
  title: string;
  items: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}> = ({ title, items, selected, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/[0.28]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md max-h-[75vh] bg-white rounded-t-lg pt-5 pb-6 pl-6 pr-4 flex flex-col">
        <div className="flex items-center gap-4 mb-6 pr-2">
          <h3 className="flex-1 text-xl font-semibold text-[#0e0f11]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full border-2 border-[#f0f1f2] flex items-center justify-center flex-shrink-0"
          >
            <img src="/icons/Close.svg" alt="" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
          {items.map((item) => {
            const isSelected = item === selected;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onSelect(item)}
                className="w-full flex items-center gap-2 py-4 text-left"
              >
                <span className="flex-1 text-base text-[#0e0f11]">
                  {item}
                </span>
                {isSelected && (
                  <img
                    src="/icons/Checkmark.svg"
                    alt=""
                    className="w-4 h-3 flex-shrink-0"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const WhenStep: React.FC<WhenStepProps> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
}) => {
  const mockDates = useMemo(() => getMockDates(), []);

  const [selectedOption, setSelectedOption] = useState<TimingOption | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>(mockDates[0]);
  const [selectedTime, setSelectedTime] = useState<string>(MOCK_TIMES[9]);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);

  const isCertainTime = selectedOption === "certain-time";

  const canProceed =
    selectedOption !== null &&
    (!isCertainTime || (Boolean(selectedDate) && Boolean(selectedTime)));

  const handleNextClick = () => {
    if (!selectedOption) return;
    onNext(
      isCertainTime
        ? { option: selectedOption, date: selectedDate, time: selectedTime }
        : { option: selectedOption }
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      {/* Header */}
      <Header title={serviceName} onBackClick={onBack} onCloseClick={onClose} />

      {/* Progress Bar */}
      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={progressValue} />
      </div>

      {/* Price Range */}
      <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />

      {/* Content */}
      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            When do you need the service?
          </h2>
        </div>

        <div className="flex flex-col">
          {OPTIONS.map((option, index) => {
            const isSelected = selectedOption === option.id;
            return (
              <React.Fragment key={option.id}>
                <button
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className="w-full flex items-start gap-2 px-6 py-4 text-left"
                >
                  <Radio selected={isSelected} />
                  <span className="text-base text-[#0e0f11]">
                    {option.label}
                  </span>
                </button>

                {option.id === "certain-time" && isSelected && (
                  <div className="bg-[#f9fafa] flex gap-4 px-6 pt-3 pb-5">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-base font-semibold text-[#0e0f11]">
                        Day
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveSheet("date")}
                        className="w-full flex items-center gap-4 border border-[#b8c0ca] rounded-lg px-4 py-[17px] bg-white"
                      >
                        <span className="flex-1 text-left text-base text-[#0e0f11] truncate">
                          {selectedDate}
                        </span>
                        <img
                          src="/icons/ChevronDown.svg"
                          alt=""
                          className="w-3 h-[7px] flex-shrink-0"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold text-[#0e0f11]">
                        Time
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveSheet("time")}
                        className="flex items-center gap-4 border border-[#b8c0ca] rounded-lg px-4 py-[17px] bg-white"
                      >
                        <span className="text-base text-[#0e0f11] whitespace-nowrap">
                          {selectedTime}
                        </span>
                        <img
                          src="/icons/ChevronDown.svg"
                          alt=""
                          className="w-3 h-[7px] flex-shrink-0"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {index < OPTIONS.length - 1 && (
                  <div className="px-2">
                    <div className="h-px w-full bg-[#e3e5e8]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <CTA onClick={handleNextClick} disabled={!canProceed}>
        Next
      </CTA>

      {/* Home indicator */}
      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>

      {/* Date / Time sub-views (bottom sheets) */}
      {activeSheet === "date" && (
        <BottomSheet
          title="Choose an option"
          items={mockDates}
          selected={selectedDate}
          onSelect={(value) => {
            setSelectedDate(value);
            setActiveSheet(null);
          }}
          onClose={() => setActiveSheet(null)}
        />
      )}
      {activeSheet === "time" && (
        <BottomSheet
          title="Choose an option"
          items={MOCK_TIMES}
          selected={selectedTime}
          onSelect={(value) => {
            setSelectedTime(value);
            setActiveSheet(null);
          }}
          onClose={() => setActiveSheet(null)}
        />
      )}
    </div>
  );
};
