"use client";
import Image from "next/image";
import Link from "next/link";

export default function AutoIntelHeader() {
  return (
    <header className="w-full shadow-xl border-gray-200 bg-[#FFFFFF]">
      <div className="mx-auto flex w-full container items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
        {/* Left Side */}
        <Link href="/" className="flex shrink-0 items-center gap-3 lg:gap-2 xl:gap-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#FBBF24] lg:h-[30px] lg:w-[30px] xl:h-[58px] xl:w-[58px]">
            <span className="text-[18px] font-bold leading-none text-[#131313] lg:text-[16px] xl:text-[32px]">
              AI
            </span>
          </div>

          <div className="leading-tight">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.02em] text-[#131313] lg:text-[13px] xl:text-[20px]">
              AUTO INTEL
            </h2>
            <p className="text-[11px] font-medium text-[#424242] lg:text-[10px] xl:text-[16px]">
              Pre-Purchase Inspection Experts
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-sm font-semibold text-[#222] sm:block">
            Welcome
          </span>

          <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-300 bg-white">
            <Image
              src="https://i.pravatar.cc/100?img=12"
              alt="User avatar"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="hidden text-sm font-medium text-[#222] md:block">
            Rony
          </div>

          {/* <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-200"
          >
            <ChevronDown size={18} />
          </button> */}
        </div>
      </div>
    </header>
  );
}