import React, { useState } from "react";
import { JobsDashboard } from "./JobsDashboard";
import { JobDetailsScreen } from "./JobDetailsScreen";
import { QuoteListScreen } from "./QuoteListScreen";
import { ChatScreen } from "./ChatScreen";
import { HireAProModal } from "./HireAProModal";
import { CancelRequestModal } from "./CancelRequestModal";
import { WriteReviewScreen } from "./WriteReviewScreen";
import { Job, Quote, getQuoteById, jobs as seedJobs } from "../data/jobs";

interface JobsAreaProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onServiceClick: (serviceName: string, serviceId: string) => void;
}

type View = "list" | "details" | "quotes" | "chat";
type Origin = "list" | "quotes";
type Modal = "hire" | "cancel" | "review" | null;

export const JobsArea: React.FC<JobsAreaProps> = ({
  currentScreen,
  onNavigate,
  onServiceClick,
}) => {
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [view, setView] = useState<View>("list");
  const [modal, setModal] = useState<Modal>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [chatOrigin, setChatOrigin] = useState<Origin>("list");
  const [detailsOrigin, setDetailsOrigin] = useState<Origin>("list");
  const [toast, setToast] = useState<string | null>(null);

  const jobWithLiveData = selectedJobId
    ? jobs.find((job) => job.id === selectedJobId)
    : undefined;
  const selectedQuote: Quote | undefined =
    jobWithLiveData && selectedQuoteId
      ? getQuoteById(jobWithLiveData, selectedQuoteId)
      : undefined;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSeeDetails = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    setSelectedJobId(jobId);
    setDetailsOrigin("list");
    setView(job && job.quotes.length > 0 ? "quotes" : "details");
  };

  const handleOpenMenu = (jobId: string) => {
    setSelectedJobId(jobId);
    setModal("cancel");
  };

  const handleGetInTouch = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job?.hiredQuoteId) return;
    setSelectedJobId(jobId);
    setSelectedQuoteId(job.hiredQuoteId);
    setChatOrigin("list");
    setView("chat");
  };

  const handleOpenChatFromQuotes = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setChatOrigin("quotes");
    setView("chat");
  };

  const handleHireConfirm = (quoteId: string) => {
    if (!selectedJobId) return;
    const quote = jobWithLiveData
      ? getQuoteById(jobWithLiveData, quoteId)
      : undefined;
    setJobs((prev) =>
      prev.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              statusId: 4,
              hiredQuoteId: quoteId,
              statusLabel: `Appointment has been set with ${
                quote?.proName ?? "your pro"
              }. You can contact your pro for further details.`,
            }
          : job
      )
    );
    setModal(null);
    setView("list");
    showToast("The quote you chose has been successfully turned into a deal!");
  };

  const handleCancelConfirm = () => {
    if (!selectedJobId) return;
    setJobs((prev) =>
      prev.map((job) =>
        job.id === selectedJobId
          ? { ...job, statusId: 9, statusLabel: "Cancelled" }
          : job
      )
    );
    setModal(null);
    setView("list");
    showToast("Your request has been cancelled.");
  };

  const handleReviewSubmit = () => {
    setModal(null);
    showToast("Thanks for your review!");
  };

  const renderView = () => {
    if (view === "details" && jobWithLiveData) {
      return (
        <JobDetailsScreen
          job={jobWithLiveData}
          onBack={() => setView(detailsOrigin)}
        />
      );
    }

    if (view === "quotes" && jobWithLiveData) {
      return (
        <QuoteListScreen
          job={jobWithLiveData}
          onBack={() => setView("list")}
          onSeeDetails={() => {
            setDetailsOrigin("quotes");
            setView("details");
          }}
          onOpenChat={handleOpenChatFromQuotes}
        />
      );
    }

    if (view === "chat" && jobWithLiveData && selectedQuote) {
      const isHired = jobWithLiveData.hiredQuoteId === selectedQuote.id;
      return (
        <>
          <ChatScreen
            quote={selectedQuote}
            onBack={() => setView(chatOrigin)}
            onSelectQuote={() => setModal("hire")}
            onLeaveReview={isHired ? () => setModal("review") : undefined}
          />
          {modal === "review" && (
            <WriteReviewScreen
              quote={selectedQuote}
              onSubmit={handleReviewSubmit}
              onBack={() => setModal(null)}
            />
          )}
        </>
      );
    }

    return (
      <JobsDashboard
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        onServiceClick={onServiceClick}
        onSeeDetails={handleSeeDetails}
        onOpenMenu={handleOpenMenu}
        onGetInTouch={handleGetInTouch}
        jobs={jobs}
      />
    );
  };

  return (
    <>
      {renderView()}
      {modal === "hire" && jobWithLiveData && (
        <HireAProModal
          quotes={jobWithLiveData.quotes}
          onConfirm={handleHireConfirm}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "cancel" && (
        <CancelRequestModal
          onConfirm={handleCancelConfirm}
          onClose={() => setModal(null)}
        />
      )}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-[70]">
          <div className="flex items-center gap-2 bg-[#003b25] text-white rounded-lg px-4 py-3 text-sm font-medium shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </>
  );
};

export default JobsArea;
