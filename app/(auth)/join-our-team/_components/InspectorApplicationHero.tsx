import { MapPin } from "lucide-react";

export default function InspectorApplicationHero() {
  return (
    <section className="w-full ">
      <div className="mx-auto flex min-h-[180px] w-full max-w-[1440px] items-center justify-center px-4 py-10 sm:px-6 sm:py-12 md:min-h-[210px] lg:px-8">
        <div className="text-center">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#171717] sm:text-[40px] md:text-[52px]">
            Inspector Application Form
          </h1>

          <p className="mx-auto mt-3 max-w-[720px] text-[12px] leading-[1.5] text-[#4f4f4f] sm:text-[13px] md:text-[14px]">
            Join Minnesota&apos;s leading vehicle inspection service. Apply to
            become a certified inspector and build a rewarding career in
            automotive services.
          </p>

          <div className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#1c1c1c] bg-white px-4 py-2 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
              <MapPin className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            </span>
            <span className="text-[12px] font-medium text-[#1f1f1f] sm:text-[13px]">
              Minnesota + Major US Metro Cities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}