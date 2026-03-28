"use client";

import { useState } from "react";
import JobStatsCards, { type JobStats } from "../_components/JobStatsCards";
import MyJobsTable from "../_components/MyJobsTable";
import AutoIntelHeader from "../_components/AutoIntelHeader";

const Page = () => {
  const [stats, setStats] = useState<JobStats | null>(null);

  return (
    <div>
      <AutoIntelHeader />
      <JobStatsCards stats={stats} />
      <MyJobsTable onStatsChange={setStats} />
    </div>
  );
};

export default Page;
