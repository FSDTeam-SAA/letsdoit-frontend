"use client";

const steps = [
  {
    id: "01",
    title: "Book Online",
    desc: "Book your comprehensive all-inclusive inspection through our secure online booking system.",
  },
  {
    id: "02",
    title: "We Travel to You",
    desc: "Our certified inspector travels to the vehicle's location anywhere in Minnesota - no need to transport the vehicle.",
  },
  {
    id: "03",
    title: "Thorough Inspection",
    desc: "Our inspector performs a comprehensive evaluation using professional diagnostic equipment and years of experience.",
  },
  {
    id: "04",
    title: "Digital Report",
    desc: "Receive your detailed digital report within 24 hours, complete with photos and recommendations.",
  },
];

export default function InspectionSteps() {
  return (
    <section className="w-full bg-[#424242] py-[96px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="relative rounded-2xl bg-[linear-gradient(103.71deg,_#EAFFEA_1.48%,_#A3FFA3_99.28%)] p-8 text-center shadow-sm transition hover:scale-[1.02]"
            >
              {/* Number */}
              <div className="mx-auto mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white text-[48px] font-semibold text-[#131313] shadow-sm">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-[#131313]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-base leading-relaxed text-[#424242]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
