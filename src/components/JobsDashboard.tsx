import React, { useState } from "react";
import { JobCard } from "./JobCard";
import { ServiceCategories } from "./ServiceCategories";
import { BottomNavigation } from "./BottomNavigation";
import { ACTIVE_STATUS_IDS, OLD_STATUS_IDS, Job, jobs as seedJobs } from "../data/jobs";

interface JobsDashboardProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onServiceClick: (serviceName: string, serviceId: string) => void;
  onSeeDetails: (jobId: string) => void;
  onOpenMenu: (jobId: string) => void;
  onGetInTouch: (jobId: string) => void;
  jobs?: Job[];
}

type JobsTab = "active" | "old";

const EmptyState: React.FC<{
  image: string;
  title: string;
  description: string;
}> = ({ image, title, description }) => (
  <div className="flex w-full flex-col items-center gap-6 px-6 py-6 text-center">
    <img
      src={image}
      alt=""
      className="h-[250px] w-[250px] object-contain"
    />
    <div className="flex flex-col items-center gap-2">
      <p className="text-xl font-semibold leading-7 text-[#0e0f11]">
        {title}
      </p>
      <p className="text-sm leading-[22px] text-[#6a7482]">{description}</p>
    </div>
  </div>
);

export const JobsDashboard: React.FC<JobsDashboardProps> = ({
  currentScreen,
  onNavigate,
  onServiceClick,
  onSeeDetails,
  onOpenMenu,
  onGetInTouch,
  jobs = seedJobs,
}) => {
  const [activeTab, setActiveTab] = useState<JobsTab>("active");

  const activeJobs = jobs.filter((job) =>
    ACTIVE_STATUS_IDS.includes(job.statusId)
  );
  const oldJobs = jobs.filter((job) => OLD_STATUS_IDS.includes(job.statusId));
  const visibleJobs = activeTab === "active" ? activeJobs : oldJobs;

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="py-3">
        <h1 className="text-center text-lg font-semibold text-gray-800">
          My jobs
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex w-full items-start bg-white px-6 pt-4">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className="flex flex-1 flex-col items-center gap-2"
        >
          <span
            className={`w-full text-center text-sm font-semibold leading-[22px] ${
              activeTab === "active" ? "text-[#2cb34f]" : "text-[#6a7482]"
            }`}
          >
            Active jobs
          </span>
          <div
            className={`h-0.5 w-full rounded-full ${
              activeTab === "active" ? "bg-[#2cb34f]" : "bg-transparent"
            }`}
          />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("old")}
          className="flex flex-1 flex-col items-center gap-2"
        >
          <span
            className={`w-full text-center text-sm font-semibold leading-[22px] ${
              activeTab === "old" ? "text-[#2cb34f]" : "text-[#6a7482]"
            }`}
          >
            Old jobs
          </span>
          <div
            className={`h-0.5 w-full rounded-full ${
              activeTab === "old" ? "bg-[#2cb34f]" : "bg-transparent"
            }`}
          />
        </button>
      </div>

      <div className="flex w-full flex-col pb-[98px]">
        <div className="flex w-full flex-col items-center bg-[#f9fafa]">
          {visibleJobs.length > 0 ? (
            <div className="flex w-full flex-col gap-4 px-6 py-6">
              {visibleJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSeeDetails={onSeeDetails}
                  onOpenMenu={onOpenMenu}
                  onGetInTouch={onGetInTouch}
                />
              ))}
            </div>
          ) : activeTab === "active" ? (
            <EmptyState
              image="/illustrations/NoActiveJobs.png"
              title="There are no active jobs"
              description="You don't have any active job request at the moment. Request the service you want, get free quotes!"
            />
          ) : (
            <EmptyState
              image="/illustrations/NoOldJobs.png"
              title="There are no old jobs"
              description="You don't have any old job. You can easily access the service you need by clicking the “Get service” tab below!"
            />
          )}
        </div>

        <ServiceCategories onServiceClick={onServiceClick} />
      </div>

      <BottomNavigation currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
};

export default JobsDashboard;
