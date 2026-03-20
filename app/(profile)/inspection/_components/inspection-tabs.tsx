"use client";

import { cn } from "@/lib/utils";
import { StepDefinition, StepKey } from "./inspection";

type Props = {
  steps: StepDefinition[];
  currentStep: StepKey;
  onStepClick?: (step: StepKey) => void;
};

export function InspectionTabs({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {steps.map((step) => {
        const isActive = currentStep === step.key;

        return (
          <button
            key={step.key}
            type="button"
            onClick={() => onStepClick?.(step.key)}
            className={cn(
              "min-w-[110px] rounded-full border px-4 py-[6px] text-base font-medium transition",
              isActive
                ? "border-black bg-[#131313] text-[#ffffff]"
                : "border-[#424242] bg-[#FEFBF5] text-[#131313]"
            )}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
}