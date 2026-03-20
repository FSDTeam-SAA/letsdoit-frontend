"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
  {
    customerName: "Haris wiket­sion",
    vehicle: "2013 Lexus Gx",
    location: "Location: 1541 Maryland Avenue Saint Paul",
    scheduled: "12/10/13",
    status: "Completed",
  },
];

export default function MyJobsTable() {
  return (
    <section className="w-full bg-[#FEFBF5] px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto container space-y-4">
        {/* Top Bar */}
        <div className="rounded-[10px]  bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
          <CardContent className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[24px] font-semibold text-[#131313]">My Jobs</h2>

            <div className="flex w-full max-w-full items-stretch overflow-hidden rounded-[8px] border border-[#bdbdbd] bg-white sm:max-w-[360px]">
              <Input
                placeholder="Search by  Status"
                className="h-[42px] border-0 bg-transparent text-[16px] text-[#222] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="h-[42px] rounded-none rounded-r-[8px] bg-[#f4bf1a] px-4 text-black hover:bg-[#e5b013]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </div>

        {/* Table for desktop / tablet */}
        <div className="hidden rounded-[10px]  bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)] md:block">
          <CardContent className="p-4">
            <div className="overflow-hidden rounded-[8px] border border-[#B6B6B6]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#B6B6B6] bg-white">
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">
                        Customer Name
                      </th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">
                        Vehicle
                      </th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">
                        Scheduled
                      </th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-[16px] font-medium text-[#131313]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#B6B6B6]"
                      >
                        <td className="px-6 py-6 text-[16px] text-[#131313]">
                          {job.customerName}
                        </td>
                        <td className="px-6 py-6 text-[16px] text-[#131313]">
                          {job.vehicle}
                        </td>
                        <td className="px-6 py-6 text-[16px] leading-[1.35] text-[#4d4d4d]">
                          <span className="inline-block max-w-[180px]">
                            {job.location}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-[16px] text-[#4d4d4d]">
                          {job.scheduled}
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-flex rounded-full bg-[#B0D0B0] px-3 py-[3px] text-[11px] font-medium text-[#2f5a2f]">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                            <Link href={'profile-details/1'}>
                          <Button className="h-[28px] rounded-full bg-[#0a8f14] px-4 text-[11px] font-medium text-white hover:bg-[#087710]">
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            View Job Details
                          </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-[#666666]">
                  Showing 1 to 5 of 12 results
                </p>

                <div className="flex items-center gap-1.5">
                  <button className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682]">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] bg-[#f4bf1a] px-2 text-[12px] font-medium text-white">
                    1
                  </button>
                  <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]">
                    ...
                  </button>
                  <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]">
                    50
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#7f8aa0] bg-white text-[#4b5563]">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {jobs.map((job, index) => (
            <Card
              key={index}
              className="rounded-[10px] border border-[#ece7dd] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
            >
              <CardContent className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] text-[#777777]">Customer Name</p>
                    <h3 className="text-[14px] font-semibold text-[#131313]">
                      {job.customerName}
                    </h3>
                  </div>

                  <span className="inline-flex rounded-full bg-[#b8d7b8] px-3 py-[3px] text-[11px] font-medium text-[#2f5a2f]">
                    {job.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[12px] text-[#777777]">Vehicle</p>
                    <p className="text-[16px] text-[#131313]">{job.vehicle}</p>
                  </div>

                  <div>
                    <p className="text-[12px] text-[#777777]">Scheduled</p>
                    <p className="text-[16px] text-[#131313]">{job.scheduled}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] text-[#777777]">Location</p>
                  <p className="text-[16px] leading-[1.4] text-[#4d4d4d]">
                    {job.location}
                  </p>
                </div>

                <Button className="h-[38px] w-full rounded-full bg-[#008000] text-[12px] font-medium text-white hover:bg-[#087710]">
                  <Eye className="mr-2 h-4 w-4" />
                  View Job Details
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="rounded-[10px] border border-[#ece7dd] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
            <CardContent className="flex flex-col gap-4 p-4">
              <p className="text-[12px] text-[#666666]">
                Showing 1 to 5 of 12 results
              </p>

              <div className="flex items-center justify-center gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682]">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] bg-[#f4bf1a] px-2 text-[12px] font-medium text-white">
                  1
                </button>
                <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]">
                  ...
                </button>
                <button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]">
                  50
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#7f8aa0] bg-white text-[#4b5563]">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}