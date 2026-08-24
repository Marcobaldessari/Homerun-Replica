import React, { useState } from "react";
import { ACTIVE_STATUS_IDS, getQuoteById, Job, Quote } from "../data/jobs";

interface JobCardProps {
  job: Job;
  onSeeDetails: (jobId: string) => void;
  onOpenMenu: (jobId: string) => void;
  onGetInTouch: (jobId: string) => void;
}

const CtaButton: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2cb34f] px-6 py-3 text-base font-semibold leading-6 text-white"
  >
    {label}
  </button>
);

const MenuDots: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Job options"
    className="flex size-4 shrink-0 cursor-pointer items-center justify-center gap-[3px]"
  >
    <span className="size-[3px] rounded-full bg-[#6a7482]" />
    <span className="size-[3px] rounded-full bg-[#6a7482]" />
    <span className="size-[3px] rounded-full bg-[#6a7482]" />
  </button>
);

const ProAvatar: React.FC<{ name: string; src: string; unreadCount?: number }> = ({
  name,
  src,
  unreadCount,
}) => {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative size-10 shrink-0">
      <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#c6f1d1]">
        {!errored ? (
          <img
            src={src}
            alt={name}
            className="size-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="text-[12px] font-semibold text-[#0e0f11]">
            {initials}
          </span>
        )}
      </div>
      {!!unreadCount && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-lg bg-[#d71d36] px-1 text-[11px] leading-4 text-white">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

const QuoteAvatarStack: React.FC<{ quotes: Quote[] }> = ({ quotes }) => {
  const visible = quotes.slice(0, 4);
  const overflow = quotes.length - visible.length;

  return (
    <div className="flex w-full items-start gap-1">
      {visible.map((quote) => (
        <ProAvatar
          key={quote.id}
          name={quote.proName}
          src={quote.avatarUrl}
          unreadCount={quote.unreadCount}
        />
      ))}
      {overflow > 0 && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f1f2] text-xs font-semibold text-[#6a7482]">
          +{overflow}
        </div>
      )}
    </div>
  );
};

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSeeDetails,
  onOpenMenu,
  onGetInTouch,
}) => {
  const isActive = ACTIVE_STATUS_IDS.includes(job.statusId);
  const hiredQuote = job.hiredQuoteId
    ? getQuoteById(job, job.hiredQuoteId)
    : undefined;
  const isHired = isActive && job.statusId === 4 && !!hiredQuote;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-[#f0f1f2] bg-white p-6 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center gap-2">
          <p className="min-w-0 flex-1 text-base font-semibold leading-6 text-[#0e0f11]">
            {job.serviceName}
          </p>
          {isActive && <MenuDots onClick={() => onOpenMenu(job.id)} />}
        </div>
        <p className="text-sm leading-[22px] text-[#6a7482]">
          {job.createdDateLabel}
        </p>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col gap-4">
        <div className="h-px w-full bg-[#e3e5e8]" />

        {!isActive ? (
          <div className="inline-flex w-fit items-start rounded bg-[#f0f1f2] px-2 py-1">
            <span className="text-xs font-semibold leading-4 text-[#0e0f11]">
              {job.statusLabel}
            </span>
          </div>
        ) : isHired && hiredQuote ? (
          <>
            <div className="flex w-full items-center gap-3">
              <ProAvatar name={hiredQuote.proName} src={hiredQuote.avatarUrl} />
              <p className="text-sm font-semibold leading-[22px] text-[#0e0f11]">
                {hiredQuote.proName}
              </p>
            </div>
            <p className="text-sm leading-[22px] text-[#6a7482]">
              {job.statusLabel}
            </p>
            <CtaButton
              label="Get in touch"
              onClick={() => onGetInTouch(job.id)}
            />
          </>
        ) : (
          <>
            <p className="text-sm leading-[22px] text-[#6a7482]">
              {job.statusLabel}
            </p>
            {job.quotes.length > 0 && <QuoteAvatarStack quotes={job.quotes} />}
            <CtaButton
              label={job.quotes.length > 0 ? "See quotes" : "See details"}
              onClick={() => onSeeDetails(job.id)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
