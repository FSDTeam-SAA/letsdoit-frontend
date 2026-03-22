"use client";

import { CalendarDays } from "lucide-react";

const inspectionCards = [
  {
    title: "Tires & Brakes",
    points: "15 Points",
    items: [
      "Tire tread depth measurement",
      "Tire wear pattern analysis",
      "Brake pad thickness check",
      "Brake rotor condition",
      "Brake fluid level & quality",
      "Brake line inspection",
      "Parking brake operation",
      "Wheel alignment indicators",
      "Tire pressure verification",
    ],
  },
  {
    title: "Exterior & Undercarriage",
    points: "52 Points",
    items: [
      "Body panel inspection",
      "Paint condition review",
      "Frame and undercarriage check",
      "Rust and corrosion inspection",
      "Glass and windshield review",
      "Door, hood, and trunk operation",
      "Bumpers and trim condition",
      "Suspension visible components",
      "Exhaust system visual check",
    ],
  },
  {
    title: "Electrical & Lights",
    points: "94 Points",
    items: [
      "Battery condition check",
      "Headlights and taillights",
      "Brake lights operation",
      "Turn signal verification",
      "Interior electronics testing",
      "Dashboard warning lights",
      "Power windows and locks",
      "Horn and wiper functionality",
      "Charging system inspection",
    ],
  },
  {
    title: "Interior",
    points: "44 Points",
    items: [
      "Seat condition review",
      "Dashboard and controls",
      "Air conditioning performance",
      "Heating system operation",
      "Seatbelt inspection",
      "Instrument cluster function",
      "Interior wear assessment",
      "Audio and infotainment check",
      "Cabin odor and cleanliness",
    ],
  },
  {
    title: "Engine",
    points: "30 Points",
    items: [
      "Engine start-up behavior",
      "Idle quality inspection",
      "Visible leaks inspection",
      "Belts and hoses condition",
      "Engine mount review",
      "Air filter condition",
      "Cooling system visual check",
      "Abnormal noises review",
      "General engine bay inspection",
    ],
  },
  {
    title: "Road Test",
    points: "15 Points",
    items: [
      "Acceleration performance",
      "Transmission shifting behavior",
      "Brake responsiveness",
      "Steering alignment feel",
      "Suspension ride quality",
      "Engine noise during drive",
      "Vibration assessment",
      "Cruise and handling review",
      "Overall drivability check",
    ],
  },
  {
    title: "Fluid Checks",
    points: "13 Points",
    items: [
      "Engine oil level and quality",
      "Brake fluid inspection",
      "Coolant condition",
      "Transmission fluid review",
      "Power steering fluid",
      "Windshield washer fluid",
      "Differential fluid if visible",
      "Fluid leak indicators",
      "Overall fluid health review",
    ],
  },
  {
    title: "Diagnostic Scan",
    points: "5 Points",
    items: [
      "OBD-II scan for codes",
      "Pending code review",
      "Stored code review",
      "Warning light verification",
      "Diagnostic summary documentation",
    ],
  },
  {
    title: "Additional Checks",
    points: "2 Points",
    items: [
      "VIN verification",
      "Odometer consistency review",
      "Key and remote check",
      "Spare tire presence",
      "Basic tool kit presence",
      "Ownership-related observations",
      "Visible modifications note",
      "Safety concern flags",
      "Final overall observations",
    ],
  },
];

export default function InspectionProcessSection() {
  return (
    <section className="w-full bg-[#f7f2e4] py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        {/* Heading */}
        <div className="mx-auto w-[760px] text-center">
          <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#161616] sm:text-[36px] md:text-[42px] lg:text-[40px]">
            Comprehensive{" "}
            <span className="text-[#F2B318]">250-Point</span> Inspection
            <br className="hidden sm:block" />
            Process
          </h2>

          <p className="mx-auto mt-4 max-w-[760px] text-[14px] leading-[1.7] text-[#4b4b4b] sm:text-[15px] md:text-[16px]">
            Our thorough inspection process covers every aspect of your vehicle
            with systematic verification and detailed documentation. Here&apos;s
            exactly what we check:
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {inspectionCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[16px] border border-[#ddd7c9] bg-[#fbfbfb] p-5 shadow-[0_6px_18px_rgba(0,0,0,0.05)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[22px] font-semibold leading-tight text-[#1b1b2f] sm:text-[24px]">
                  {card.title}
                </h3>

                <span className="inline-flex shrink-0 items-center rounded-full bg-[#087A11] px-4 py-2 text-[13px] font-semibold text-white">
                  {card.points}
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[14px] leading-6 text-[#5a5a5a] sm:text-[15px]"
                  >
                    <span className="mt-[10px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#6a6a6a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F4B91F] px-6 text-[14px] font-semibold text-[#1E3A8A] transition hover:opacity-90 sm:h-[54px] sm:px-8 sm:text-[16px]"
          >
            <CalendarDays className="h-4 w-4 shrink-0" />
            Book Your Inspection Now
          </button>
        </div>
      </div>
    </section>
  );
}