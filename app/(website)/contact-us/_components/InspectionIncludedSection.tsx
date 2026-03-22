"use client";

import Image from "next/image";
import { ShieldCheck, CalendarDays } from "lucide-react";

export default function InspectionIncludedSection() {
  return (
    <section className="w-full bg-[#f5f1e4] py-12 sm:py-14 md:py-16 lg:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-4">
        {/* Left Image */}
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="relative h-[260px] w-full overflow-hidden rounded-[18px] sm:h-[360px] md:h-[460px] lg:h-[577px]">
            <Image
              src="/contact3.png"
              alt="Mechanic inspecting a vehicle"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full max-w-[700px]">
          <h2 className="max-w-[560px] text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#131313] sm:text-[34px] md:text-[38px] lg:text-[40px]">
            What&apos;s Included in Every Inspection
          </h2>

          <p className="mt-4 max-w-full text-[14px] leading-[1.7] text-[#424242] sm:text-[15px] md:text-[16px] lg:w-[700px] lg:text-[18px]">
            Our comprehensive all-inclusive inspection package covers
            everything you need to make an informed vehicle purchase decision.
          </p>

          <div className="mt-5 flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              <ShieldCheck className="h-5 w-5 text-[#1E3A8A]" strokeWidth={2} />
            </div>
            <p className="text-[13px] font-bold leading-6 text-[#131313] sm:text-[14px]">
              Minnesota + Major US Metro Cities
            </p>
          </div>

          <div className="mt-8 flex justify-start sm:mt-10 lg:justify-end">
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F4B91F] px-5 text-[15px] font-semibold text-[#1E3A8A] transition hover:opacity-90 sm:h-[52px] sm:w-auto sm:px-8 sm:text-[16px] lg:text-[18px]"
            >
              <CalendarDays className="h-4 w-4 shrink-0" />
              Book Your Inspection Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}