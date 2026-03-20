"use client";

import Image from "next/image";
import { CheckCircle2, Clock } from "lucide-react";
import { PhotoChecklistItem } from "./inspection";

type Props = {
  item: PhotoChecklistItem;
  onFileChange: (itemId: string, file: File | null, preview: string) => void;
};

export function PhotoUploadCard({ item, onFileChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      onFileChange(item.id, null, "");
      return;
    }
    const preview = URL.createObjectURL(file);
    onFileChange(item.id, file, preview);
  };

  const isCompleted = Boolean(item.file || item.preview);
  const status = isCompleted ? "Completed" : "Pending";
  const statusColor = isCompleted ? "text-[#006600]" : "text-[#f0a500]";

  return (
    <div>
      <p className="mb-2 text-[14px] font-medium text-[#2A2A2A]">
        {item.title}
      </p>

      <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-[#c7c7c7] bg-white p-3 text-center">
        {item.preview ? (
          <div className="relative h-[78px] w-[120px] overflow-hidden rounded">
            <Image
              src={item.preview}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized={
                item.preview.startsWith("data:") ||
                item.preview.startsWith("blob:")
              }
            />
          </div>
        ) : (
          <>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#ededed]">
              <Image src="/icon1.png" width={80} height={80} alt="icon" />
            </div>
            <p className="text-[13px] text-[#2A2A2A]">Upload Photo</p>
          </>
        )}

        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>

      <div className={`mt-2 flex items-center justify-end gap-1 text-[13px] font-medium ${statusColor}`}>
        {isCompleted ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
        <span>{status}</span>
      </div>
    </div>
  );
}
