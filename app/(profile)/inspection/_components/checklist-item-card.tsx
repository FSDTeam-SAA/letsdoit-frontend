"use client";

import { Textarea } from "@/components/ui/textarea";
import { CheckStatus, TextChecklistItem } from "./inspection";
type Props = {
  item: TextChecklistItem;
  onChange: (itemId: string, payload: Partial<TextChecklistItem>) => void;
};

export function ChecklistItemCard({ item, onChange }: Props) {
  const setStatus = (status: CheckStatus) => {
    onChange(item.id, { status });
  };

  return (
    <div className="rounded-[10px] border border-[#B6B6B6] bg-white p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-[16px] font-semibold text-[#131313]">{item.title}</h4>
        <div className="flex items-center gap-3 text-[16px]">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={item.status === "ok"}
              onChange={() => setStatus("ok")}
            />
            Ok
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={item.status === "report"}
              onChange={() => setStatus("report")}
            />
            Report
          </label>
        </div>
      </div>

      {item.status === "report" ? (
        <>
          <p className="mb-2 text-[16px] text-[#2A2A2A]">
            Inspector Notes
          </p>
          <Textarea
            value={item.note}
            onChange={(e) => onChange(item.id, { note: e.target.value })}
            placeholder="Write here"
            className="min-h-[82px] resize-none rounded-[8px] border-[#bdbdbd] text-xs"
          />
        </>
      ) : null}
    </div>
  );
}
