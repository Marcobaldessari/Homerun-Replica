import React, { useEffect, useRef, useState } from "react";
import type { Quote } from "../data/jobs";

export interface ChatMessage {
  id: string;
  author: "consumer" | "pro";
  text: string;
  timeLabel: string; // e.g. "09:54"
}

export interface ChatScreenProps {
  /** The pro being chatted with. */
  quote: Quote;
  onBack: () => void;
  /** The "Select quote" button — opens the Hire-a-pro modal (owned by the parent). */
  onSelectQuote: () => void;
  /** Optional: shows a "Leave a review" link when the pro has already been hired. */
  onLeaveReview?: () => void;
}

const formatNow = (): string =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const seedMessages = (): ChatMessage[] => [
  {
    id: "seed-1",
    author: "consumer",
    text:
      "Hi there, I have a bit of a plumbing issue at my house. The kitchen sink is leaking pretty badly. Could you help me out?",
    timeLabel: "09:54",
  },
  {
    id: "seed-2",
    author: "pro",
    text:
      "Hello! I'm sorry to hear about the leak. I can definitely help you with that. When did you first notice the problem?",
    timeLabel: "09:56",
  },
  {
    id: "seed-3",
    author: "pro",
    text:
      "It sounds like it could be a problem with the faucet itself or a loose connection in the plumbing. I can come by tomorrow morning to take a look. Does 9 AM work for you?",
    timeLabel: "09:58",
  },
];

/**
 * "Native - Consumer - Chat - Select quote" (Figma node 8872:64060).
 *
 * A local, static mock chat: no backend/websocket. Seeds a short thread and lets
 * the consumer type + send messages that are appended to local state only.
 */
export const ChatScreen: React.FC<ChatScreenProps> = ({
  quote,
  onBack,
  onSelectQuote,
  onLeaveReview,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages());
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: "consumer",
        text,
        timeLabel: formatNow(),
      },
    ]);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white relative overflow-hidden">
      {/* Header: back arrow, pro avatar/name/see-profile, phone icon */}
      <div className="shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 h-[48px]">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="shrink-0 w-8 h-8 flex items-center justify-center"
          >
            <img
              src="/69bc3e7016a8de92b9799edcf4448eb40f3c8fe2.svg"
              alt=""
              className="w-6 h-6"
            />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={quote.avatarUrl}
              alt={quote.proName}
              className="w-10 h-10 rounded-full object-cover border border-[#e3e5e8] shrink-0"
            />
            <div className="flex flex-col min-w-0 text-sm leading-[22px]">
              <span className="font-semibold text-[#0e0f11] truncate">
                {quote.proName}
              </span>
              <span className="text-[#6a7482]">See profile</span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Call"
            className="shrink-0 w-8 h-8 flex items-center justify-center"
          >
            <img src="/icons/PhoneCallIcon.svg" alt="" className="w-6 h-6" />
          </button>
        </div>
        <div className="h-px bg-[#f0f1f2]" />

        {/* Price + Select quote */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-[#6a7482]">
            {quote.priceLabel}
          </span>
          {onLeaveReview ? (
            <button
              type="button"
              onClick={onLeaveReview}
              className="text-sm font-semibold text-[#0e0f11] underline"
            >
              Leave a review
            </button>
          ) : (
            <button
              type="button"
              onClick={onSelectQuote}
              className="bg-[#2cb34f] hover:bg-[#259a44] transition-colors rounded-lg px-4 py-[7px] text-sm font-semibold text-white"
            >
              Select quote
            </button>
          )}
        </div>
        <div className="h-px bg-[#f0f1f2]" />
      </div>

      {/* Scrollable message thread */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <p className="text-center text-sm text-[#6a7482] pb-2">09 may 2024</p>

        <div className="flex flex-col gap-2 pb-2">
          {messages.map((message) => {
            const isConsumer = message.author === "consumer";
            return (
              <div
                key={message.id}
                className={`flex ${isConsumer ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[274px] rounded-2xl px-4 py-2 flex flex-wrap items-end justify-end gap-x-2 ${
                    isConsumer
                      ? "bg-[#f0f1f2]"
                      : "bg-white border border-[#e3e5e8]"
                  }`}
                >
                  <p className="flex-1 min-w-0 text-base leading-6 text-[#0e0f11] break-words">
                    {message.text}
                  </p>
                  <span className="flex items-center gap-1 shrink-0">
                    <span className="text-xs leading-4 text-[#6a7482] whitespace-nowrap">
                      {message.timeLabel}
                    </span>
                    {isConsumer && (
                      <img
                        src="/icons/ReadReceiptDoubleCheck.svg"
                        alt="Read"
                        className="w-[19px] h-3"
                      />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-[#e3e5e8] bg-white">
        <div className="flex items-center gap-3 px-4 py-2 h-[58px]">
          <button
            type="button"
            aria-label="Attach"
            className="shrink-0 w-6 h-6 flex items-center justify-center"
          >
            <img src="/icons/AttachPlusIcon.svg" alt="" className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0 flex items-center gap-2 bg-[#f9fafa] border border-[#e3e5e8] rounded-[20px] pl-[17px] pr-[9px] py-[9px]">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write something..."
              className="flex-1 min-w-0 bg-transparent text-base leading-6 text-[#0e0f11] placeholder-[#b8c0ca] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim()}
              aria-label="Send"
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                draft.trim()
                  ? "bg-[#2cb34f] hover:bg-[#259a44]"
                  : "bg-[#2cb34f] opacity-50 cursor-not-allowed"
              }`}
            >
              <img
                src="/icons/SendArrow.svg"
                alt=""
                className="w-4 h-4 rotate-90"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="shrink-0 h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full" />
      </div>
    </div>
  );
};

export default ChatScreen;
