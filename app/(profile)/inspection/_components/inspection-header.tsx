"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function InspectionHeader() {
  return (
    <div className=" flex items-center gap-3 mb-7">
      <Button
        type="button"
        variant="outline"
        className="h-8 rounded-full border-black px-4 text-xs"
      >
        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
        Back
      </Button>

      <h1 className="text-[22px] font-semibold text-[#131313] sm:text-[32px]">
        Inspection Checklists 
      </h1>
    </div>
  );
}