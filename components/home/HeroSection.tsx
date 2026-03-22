"use client";

import Image from "next/image";
import { CalendarDays, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
 
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
  <div className="absolute inset-0">
  <Image
    src="/newhero.png"
    alt="Vehicle inspection service"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
</div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[620px] container items-center px-4 sm:px-6 md:px-8 lg:min-h-[720px] lg:px-10 xl:px-0">
        <div className="max-w-[760px] pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
          {/* Heading */}
          <h1 className="max-w-[740px] text-[34px] font-extrabold leading-[80px] tracking-[-0.02em] text-[#FFFFFF] sm:text-[46px] md:text-[64px] lg:text-[64px] ">
            Minnesota’s #1 Vehicle Inspection Service,
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[620px] text-[14px] leading-6 text-[#E7E7E7] sm:mt-5 sm:text-[15px] md:text-[18px]">
            Don’t just buy a car, buy confidence. Get your inspection done right.
            Professional Vehicle Inspection Excellence
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Button
              className="h-12 rounded-full bg-[#FBBF24] px-6 text-[18px] font-bold text-[#1E3A8A] shadow-none hover:bg-[#e0aa10] sm:h-[56px] sm:px-7"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              View All Packages &amp; Book
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-full border border-[#F4BC17] bg-[#FFFFFF3D] px-6 text-[18px] font-bold text-[#FBBF24] shadow-none hover:bg-[#F4BC17]/10 hover:text-[#F4BC17] sm:h-[56px] sm:px-7"
            >
              <Phone className="mr-2 h-4 w-4" />
              Get Your Free Quote
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 md:max-w-[520px]">
            <div className="rounded-[18px] bg-[#E7E7E7] px-6 py-5 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
              <h3 className="text-center text-[24px] font-extrabold leading-none text-[#006600]">
                1000+
              </h3>
              <p className="mt-2 text-center text-[16px] font-medium text-[#131313]">
                Happy Customers
              </p>
            </div>

            <div className="rounded-[18px] bg-[#E7E7E7] px-4 py-5 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
              <h3 className="text-center text-[24px] font-extrabold leading-none text-[#006600]">
                4.9
                <span className="ml-1 text-[#F4BC17]">★</span>
              </h3>
              <p className="mt-2 text-center text-[16px] font-medium text-[#131313]">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}