"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {  CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  ClipboardList,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const includedItems = [
  {
    icon: ShieldCheck,
    title: "Certified Inspector",
    description: "ASE-certified technician performs your inspection",
    iconWrap: "bg-[#FFF1CC]",
    iconColor: "text-[#E2A500]",
  },
  {
    icon: Wrench,
    title: "Professional Tools",
    description: "Latest diagnostic equipment and inspection tools",
    iconWrap: "bg-[#DFF0DE]",
    iconColor: "text-[#2F8F3A]",
  },
  {
    icon: ClipboardList,
    title: "Digital Report",
    description: "Comprehensive digital report delivered within 24 hours",
    iconWrap: "bg-[#E5EBFF]",
    iconColor: "text-[#4A66C9]",
  },
  {
    icon: Clock3,
    title: "Follow-up Support",
    description: "Available to answer questions about your report",
    iconWrap: "bg-[#DDF8F1]",
    iconColor: "text-[#00A785]",
  },
];

export default function IncludedInspectionSection() {
  return (
    <section className="w-full bg-[#f7f7f5] px-4 py-12 sm:px-6 sm:py-16 lg:px-0 lg:py-20">
      <div className="mx-auto container">
        {/* Top content */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_699px] lg:gap-10">
          {/* Left content */}
          <div className="max-w-[699px] text-center lg:text-left">
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#131313] sm:text-[36px] lg:text-[40px]">
              What&apos;s Included in Every Inspection
            </h2>

            <p className="mt-5 text-[14px] leading-7 text-[#424242] sm:text-[16px] lg:text-[18px]">
              Our comprehensive all-inclusive inspection package covers
              everything you need to make an informed vehicle purchase decision.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-[14px] font-medium text-[#1f1f1f] lg:justify-start">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3ff]">
                <ShieldCheck className="h-4 w-4 text-[#1f3f9f]" />
              </span>
              <span>Minnesota + Major US Metro Cities</span>
            </div>

            <div className="mt-7 flex justify-center lg:justify-start">
              <Button className="h-[50px] rounded-full bg-[#f4be17] px-7 text-[15px] font-semibold text-[#1d1d1d] hover:bg-[#e7b20f]">
                <CalendarDays className="mr-2 h-4 w-4" />
                Book Your Inspection Now
              </Button>
            </div>
          </div>

          {/* Right image collage */}
          <div className="relative mx-auto w-full max-w-[699px]">
            <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px]">
              <Image
                src="/car.png"
                alt="Inspection service vehicle"
                width={699}
                height={699}
                className="h-auto w-full object-cover"
              />
            </div>

         
          </div>
        </div>

        {/* Bottom feature cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {includedItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[18px] border border-[#e8e8e8] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              >
                <CardContent className="flex flex-col items-center px-6 py-8 text-center">
                  <div
                    className={`flex h-[62px] w-[62px] items-center justify-center rounded-full ${item.iconWrap}`}
                  >
                    <Icon className={`h-7 w-7 ${item.iconColor}`} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-[24px] font-semibold leading-tight text-[#202020]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-6 text-[#666666]">
                    {item.description}
                  </p>
                </CardContent>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
