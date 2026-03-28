"use client";

import { Check, Clock3, CarFront, BriefcaseBusiness } from "lucide-react";

export type JobStats = {
  totalJobs: number;
  totalPending: number;
  totalInProgress: number;
  totalCompleted: number;
};

type JobStatsCardsProps = {
  stats?: JobStats | null;
};

const statsConfig: Array<{
  title: string;
  key: keyof JobStats;
  icon: typeof Clock3;
  iconWrap: string;
  iconColor: string;
}> = [
  {
    title: "Pending",
    key: "totalPending",
    icon: Clock3,
    iconWrap: "bg-[#FFF3D6]",
    iconColor: "text-[#F4B400]",
  },
  {
    title: "In Progress",
    key: "totalInProgress",
    icon: CarFront,
    iconWrap: "bg-[#FFE2E0]",
    iconColor: "text-[#FF6B5F]",
  },
  {
    title: "Completed",
    key: "totalCompleted",
    icon: Check,
    iconWrap: "bg-[#DDF5E4]",
    iconColor: "text-[#1E8E3E]",
  },
  {
    title: "Total Jobs",
    key: "totalJobs",
    icon: BriefcaseBusiness,
    iconWrap: "bg-[#E3EBFF]",
    iconColor: "text-[#4C6EDB]",
  },
];

const formatCount = (value: unknown) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "00";
  return String(num).padStart(2, "0");
};

export default function JobStatsCards({ stats }: JobStatsCardsProps) {
  return (
    <section className="w-full bg-[#FEFBF5] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsConfig.map((item, index) => {
            const Icon = item.icon;
            const value = stats?.[item.key] ?? 0;

            return (
              <div
                key={index}
                className="flex min-h-[88px] items-center gap-3 rounded-[10px] border border-[#e7e2d9] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconWrap}`}
                >
                  <Icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2} />
                </div>

                <div className="leading-none">
                  <p className="text-[13px] font-medium text-[#4a4a4a]">
                    {item.title}
                  </p>
                  <h3 className="mt-1 text-[30px] font-semibold text-[#1d1d1d]">
                    {formatCount(value)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
