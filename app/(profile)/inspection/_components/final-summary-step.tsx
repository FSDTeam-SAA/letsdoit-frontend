"use client";

import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function FinalSummaryStep({ value, onChange }: Props) {
  return (
    <div className="rounded-[14px] border border-[#d5d5d5] bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[22px] font-medium text-[#333]">Final Summary</h2>

      <div className="rounded-[12px] border border-[#cfcfcf] p-4">
        <p className="mb-2 text-[13px] text-[#333]">Inspector Notes</p>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write here"
          className="min-h-[180px] resize-none rounded-[8px] border-[#a9a9a9]"
        />
      </div>
    </div>
  );
}