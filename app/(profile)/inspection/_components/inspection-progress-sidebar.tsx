"use client";

import type { CSSProperties } from "react";
import type {
  InspectionFormData,
  PhotoChecklistItem,
  StepDefinition,
  StepKey,
  TextChecklistItem,
} from "./inspection";

type Props = {
  steps: StepDefinition[];
  currentStep: StepKey;
  formData: InspectionFormData;
};

type ChecklistKey = Exclude<StepKey, "finalSummary">;
type ChecklistSection = InspectionFormData[ChecklistKey];
type ProgressStyle = CSSProperties & { "--progress": string };

function isPhotoSection(
  section: ChecklistSection
): section is PhotoChecklistItem[] {
  return section.length > 0 && "file" in section[0];
}

function isTextSection(
  section: ChecklistSection
): section is TextChecklistItem[] {
  return section.length > 0 && "status" in section[0];
}

function getStepProgress(stepKey: StepKey, formData: InspectionFormData) {
  if (stepKey === "finalSummary") {
    return {
      completed: formData.finalSummary.note.trim() ? 1 : 0,
      total: 1,
    };
  }

  const section = formData[stepKey as ChecklistKey];

  if (section.length === 0) {
    return { completed: 0, total: 0 };
  }

  if (isPhotoSection(section)) {
    const completed = section.filter((item) => item.file || item.preview).length;
    return { completed, total: section.length };
  }

  if (isTextSection(section)) {
    const completed = section.filter((item) => item.status === "ok" || item.status === "report").length;
    return { completed, total: section.length };
  }

  return { completed: 0, total: 0 };
}

export function InspectionProgressSidebar({
  steps,
  formData,
}: Props) {
  const checklistSteps = steps.filter((s) => s.key !== "finalSummary");

  const totals = checklistSteps.reduce(
    (acc, step) => {
      const { completed, total } = getStepProgress(step.key, formData);
      acc.completed += completed;
      acc.total += total;
      return acc;
    },
    { completed: 0, total: 0 }
  );

  const percent = totals.total
    ? Math.round((totals.completed / totals.total) * 100)
    : 0;

  const progressStyle: ProgressStyle = {
    "--progress": `${percent * 3.6}deg`,
  };

  return (
    <aside className="rounded-[14px] border border-[#d4d4d4] bg-white p-4 shadow-sm">
      <div className="mx-auto mb-5 flex h-[170px] w-[170px] items-center justify-center rounded-full bg-[conic-gradient(#1f3f9f_var(--progress),#e5e7f0_0)]"
        style={progressStyle}
      >
        <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-white text-center">
          <p className="text-[22px] font-bold text-green-700">{percent}%</p>
          <p className="text-[12px] leading-4 text-[#222]">
            {totals.completed} of {totals.total} Questions
            <br />
            completed
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-[24px] font-medium text-[#2A2A2A]">
        Category Progress:
      </h3>

      <div className="space-y-2">
        {checklistSteps.map((step) => {
          const { completed, total } = getStepProgress(step.key, formData);
          const width = total ? (completed / total) * 100 : 0;

          return (
            <div key={step.key}>
              <div className="mb-1 flex items-center justify-between text-[16px] font-medium text-[#424242]">
                <span>{step.label}:</span>
                <span>
                  {completed}/{total}
                </span>
              </div>

              <div className="h-[7px] w-full rounded-full bg-[#bdbdbd]">
                <div
                  className="h-[7px] rounded-full bg-[#006600]"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
