"use client";

import { Button } from "@/components/ui/button";
import {  CardContent } from "@/components/ui/card";
import { ArrowLeft, CarFront, CircleUserRound, ClipboardList } from "lucide-react";
import Link from "next/link";

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#cfcfcf] pb-2">
      <p className="text-[16px] font-medium text-[#000000]">{label}</p>
      <p className="mt-1 text-[20px] font-medium leading-[1.35] text-[#000000]">
        {value}
      </p>
    </div>
  );
}

export default function JobDetailsCard() {
  return (
    <section className="min-h-screen bg-[#FEFBF5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto container">
        {/* Back button */}
        <div className="mb-4">
            <Link href="/profile">
          <Button
            variant="outline"
            className="h-[32px] rounded-full border-black bg-[#FEFBF5] px-4 text-[12px] font-medium text-black hover:bg-white"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back
          </Button>
          </Link>
        </div>

        {/* Main card */}
        <div className="rounded-[14px] border border-[#B6B6B6] bg-[#FFFFFF] shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          <CardContent className="p-5 sm:p-7 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {/* Customer Information */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <CircleUserRound className="h-4 w-4 text-[#222222]" />
                  <h2 className="text-[24px] font-medium text-[#424242]">
                    Customer Information:
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8">
                  <InfoItem label="First Name:" value="Jonson" />
                  <InfoItem label="Last Name:" value="Morris" />
                  <InfoItem label="Email:" value="example@gmail.com" />
                  <InfoItem label="Phone Number:" value="+2196412365" />
                </div>

                <div className="mt-3">
                  <InfoItem
                    label="Schedule Date:"
                    value="Wednesday, October 15, 2025"
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <CarFront className="h-4 w-4 text-[#222222]" />
                  <h2 className="text-[24px] font-medium text-[#424242]">
                    Vehicle Information:
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8">
                  <InfoItem label="Vehicle:" value="Honda civic 2014" />
                  <InfoItem label="VIN:" value="51649846446464644" />
                  <InfoItem label="License Plate:" value="0214643423" />
                  <InfoItem label="License Plate:" value="0214643423" />
                  <InfoItem label="License Plate:" value="0214643423" />
                  <InfoItem label="License Plate:" value="0214643423" />
                </div>

                <div className="mt-3">
                  <InfoItem
                    label="Address:"
                    value="Street, Minnesota, 154454, USA"
                  />
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="mt-8 flex justify-center">
              <Link href="/inspection">
              <Button className="h-[42px] w-full max-w-[860px] rounded-full bg-[#FBBF24] px-6 text-[16px] font-bold text-[#131313] hover:bg-[#e3a910]">
                <ClipboardList className="mr-2 h-4 w-4" />
                Take Inspection Checklist by 50 questions
              </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </section>
  );
}