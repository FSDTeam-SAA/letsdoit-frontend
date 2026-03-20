"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InspectionFormData,
  PhotoChecklistItem,
  StepDefinition,
  TextChecklistItem,
} from "@/app/(profile)/inspection/_components/inspection";
import { Camera, CarFront } from "lucide-react";
import { ChecklistItemCard } from "./checklist-item-card";
import { PhotoUploadCard } from "./photo-upload-card";
import { FinalSummaryStep } from "./final-summary-step";
import { InspectionHeader } from "./inspection-header";
import { InspectionTabs } from "./inspection-tabs";
import { InspectionProgressSidebar } from "./inspection-progress-sidebar";

const steps: StepDefinition[] = [
  { key: "requiredPhotos", label: "Required Photos" },
  { key: "additionalPhotos", label: "Additional Photos" },
  { key: "vehicleRepresentation", label: "Vehicle Representation" },
  { key: "tiresBrakes", label: "Tires & Brakes" },
  { key: "exterior", label: "Exterior" },
  { key: "engine", label: "Engine" },
  { key: "interior", label: "Interior" },
  { key: "fluidCheck", label: "Fluids" },
  { key: "roadTest", label: "Road Test" },
  { key: "scanTool", label: "Scan Tool" },
  { key: "focusAreas", label: "Focus Areas" },
  { key: "finalSummary", label: "Final Step" },
];

function createTextItems(items: string[]): TextChecklistItem[] {
  return items.map((title, index) => ({
    id: `${title}-${index}`,
    title,
    status: "",
    note: "",
  }));
}

function createPhotoItems(items: string[]): PhotoChecklistItem[] {
  return items.map((title, index) => ({
    id: `${title}-${index}`,
    title,
    file: null,
    preview: "",
  }));
}

const initialData: InspectionFormData = {
  requiredPhotos: createPhotoItems([
    "Front Interior",
    "Front Exterior",
    "Passenger Side",
    "Left Fender",
    "Right Fender",
    "Left Quarter Panel",
    "Right Quarter Panel",
    "Rear Exterior",
    "Front Bumper",
    "Rear Bumper",
    "Engine Bay",
    "VIN Plate",
    "Odometer / Mileage",
    "Dashboard Console",
    "Front Seats - Driver",
    "Front Seats - Passenger",
    "Rear Seats - Driver Side",
    "Rear Seats - Passenger Side",
    "Flooring",
    "Roof Interior",
    "Undercarriage - Front",
    "Undercarriage - Rear",
    "Trunk Interior",
    "Wheel Photo - Driver Front",
    "Wheel Photo - Passenger Front",
    "Wheel Photo - Driver Rear",
    "Wheel Photo - Passenger Rear",
  ]),
  additionalPhotos: createPhotoItems([
    "Additional Photo #1",
    "Additional Photo #2",
    "Additional Photo #3",
    "Additional Photo #4",
    "Additional Photo #5",
  ]),
  vehicleRepresentation: createTextItems([
    "Owner manual present",
    "Service history",
    "Oil change record",
    "Major service record",
    "CarFax/AutoCheck",
    "Key count",
    "Glovebox key",
  ]),
  tiresBrakes: createTextItems([
    "Tire size match",
    "Spare tire present",
    "Tread depth DF",
    "Tread depth PF",
    "Tread depth DR",
    "Tread depth PR",
    "Brake pads front",
    "Brake pads rear",
  ]),
  exterior: createTextItems([
    "Front alignment",
    "Hood",
    "Front bumper",
    "Grille",
    "Windshield",
    "Lights",
    "Left doors",
    "Left rocker",
    "Left mirror",
    "Right doors",
    "Right rocker",
    "Right mirror",
    "Rear bumper",
    "Tailgate",
    "Quarter panels",
    "Rear lights",
  ]),
  engine: createTextItems([
    "Oil level",
    "Coolant level",
    "Leaks",
    "Belts",
    "Hoses",
    "Battery",
    "Air filter",
  ]),
  interior: createTextItems([
    "Door",
    "Driver seat",
    "Passenger seat",
    "Seat belts",
    "Dash",
    "Console",
    "Windows",
    "Locks",
    "Infotainment",
    "HVAC",
    "Rear seats",
    "Rear belts",
    "Cargo area",
  ]),
  fluidCheck: createTextItems([
    "Engine oil",
    "Transmission fluid",
    "Brake fluid",
    "Coolant",
    "Power steering",
    "Washer fluid",
  ]),
  roadTest: createTextItems([
    "Startup",
    "Idle",
    "Acceleration",
    "Transmission",
    "Steering",
    "Brakes",
    "Noise",
    "Suspension",
    "Vibration",
    "Cruise",
    "AWD/4x4",
  ]),
  scanTool: createTextItems([
    "Stored codes",
    "Pending codes",
    "Monitor readiness",
  ]),
  focusAreas: createTextItems([
    "Previous damage",
    "Rust",
    "Leaks",
    "Suspicious noises",
  ]),
  finalSummary: {
    note: "",
  },
};

function TextStepSection({
  title,
  countLabel,
  items,
  onItemChange,
}: {
  title: string;
  countLabel: string;
  items: TextChecklistItem[];
  onItemChange: (itemId: string, payload: Partial<TextChecklistItem>) => void;
}) {
  return (
    <div className="rounded-[14px] border border-[#d5d5d5] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[24px] font-semibold text-[#424242]">
          <CarFront className="!h-5 !w-5 text-[#424242" />
          {title}
        </h2>
        <span className="text-sm text-[#333]">{countLabel}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            onChange={onItemChange}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoStepSection({
  title,
  countLabel,
  items,
  onFileChange,
}: {
  title: string;
  countLabel: string;
  items: PhotoChecklistItem[];
  onFileChange: (itemId: string, file: File | null, preview: string) => void;
}) {
  return (
    <div className="rounded-[14px] border border-[#d5d5d5] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[24px] font-semibold text-[#424242]">
          <Camera className="h-4 w-4" />
          {title}
        </h2>
        <span className="text-sm text-[#333]">{countLabel}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <PhotoUploadCard
            key={item.id}
            item={item}
            onFileChange={onFileChange}
          />
        ))}
      </div>
    </div>
  );
}

export function InspectionMultiStepForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<InspectionFormData>(initialData);
  const router = useRouter();

  const currentStep = steps[currentStepIndex];

  const updateTextSection = (
    sectionKey:
      | "vehicleRepresentation"
      | "tiresBrakes"
      | "exterior"
      | "engine"
      | "interior"
      | "fluidCheck"
      | "roadTest"
      | "scanTool"
      | "focusAreas",
    itemId: string,
    payload: Partial<TextChecklistItem>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item) =>
        item.id === itemId ? { ...item, ...payload } : item
      ),
    }));
  };

  const updatePhotoSection = (
    sectionKey: "requiredPhotos" | "additionalPhotos",
    itemId: string,
    file: File | null,
    preview: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item) =>
        item.id === itemId ? { ...item, file, preview } : item
      ),
    }));
  };

  const stepContent = useMemo(() => {
    switch (currentStep.key) {
      case "requiredPhotos":
        return (
          <PhotoStepSection
            title="Required Photos"
            countLabel="1/27"
            items={formData.requiredPhotos}
            onFileChange={(itemId, file, preview) =>
              updatePhotoSection("requiredPhotos", itemId, file, preview)
            }
          />
        );

      case "additionalPhotos":
        return (
          <PhotoStepSection
            title="Additional Photos"
            countLabel="1/15"
            items={formData.additionalPhotos}
            onFileChange={(itemId, file, preview) =>
              updatePhotoSection("additionalPhotos", itemId, file, preview)
            }
          />
        );

      case "vehicleRepresentation":
        return (
          <TextStepSection
            title="Vehicle Documentation"
            countLabel="1/15"
            items={formData.vehicleRepresentation}
            onItemChange={(itemId, payload) =>
              updateTextSection("vehicleRepresentation", itemId, payload)
            }
          />
        );

      case "tiresBrakes":
        return (
          <TextStepSection
            title="Vehicle Tires & Brakes"
            countLabel="1/15"
            items={formData.tiresBrakes}
            onItemChange={(itemId, payload) =>
              updateTextSection("tiresBrakes", itemId, payload)
            }
          />
        );

      case "exterior":
        return (
          <TextStepSection
            title="Vehicle Exterior"
            countLabel="1/15"
            items={formData.exterior}
            onItemChange={(itemId, payload) =>
              updateTextSection("exterior", itemId, payload)
            }
          />
        );

      case "engine":
        return (
          <TextStepSection
            title="Engine"
            countLabel="1/15"
            items={formData.engine}
            onItemChange={(itemId, payload) =>
              updateTextSection("engine", itemId, payload)
            }
          />
        );

      case "interior":
        return (
          <TextStepSection
            title="Interior"
            countLabel="1/15"
            items={formData.interior}
            onItemChange={(itemId, payload) =>
              updateTextSection("interior", itemId, payload)
            }
          />
        );

      case "fluidCheck":
        return (
          <TextStepSection
            title="Fluids"
            countLabel="1/15"
            items={formData.fluidCheck}
            onItemChange={(itemId, payload) =>
              updateTextSection("fluidCheck", itemId, payload)
            }
          />
        );

      case "roadTest":
        return (
          <TextStepSection
            title="Road Test"
            countLabel="1/15"
            items={formData.roadTest}
            onItemChange={(itemId, payload) =>
              updateTextSection("roadTest", itemId, payload)
            }
          />
        );

      case "scanTool":
        return (
          <TextStepSection
            title="Scan Tool"
            countLabel="1/15"
            items={formData.scanTool}
            onItemChange={(itemId, payload) =>
              updateTextSection("scanTool", itemId, payload)
            }
          />
        );

      case "focusAreas":
        return (
          <TextStepSection
            title="Focus Areas"
            countLabel="1/15"
            items={formData.focusAreas}
            onItemChange={(itemId, payload) =>
              updateTextSection("focusAreas", itemId, payload)
            }
          />
        );

      case "finalSummary":
        return (
          <FinalSummaryStep
            value={formData.finalSummary.note}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                finalSummary: { note: value },
              }))
            }
          />
        );

      default:
        return null;
    }
  }, [currentStep.key, formData]);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      requiredPhotos: formData.requiredPhotos.map((item) => ({
        id: item.id,
        title: item.title,
        fileName: item.file?.name || "",
        preview: item.preview,
      })),
      additionalPhotos: formData.additionalPhotos.map((item) => ({
        id: item.id,
        title: item.title,
        fileName: item.file?.name || "",
        preview: item.preview,
      })),
      submittedAt: new Date().toISOString(),
    };

    console.log("FINAL INSPECTION DATA => ", payload);
    try {
      sessionStorage.setItem("inspectionReportData", JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to store inspection report data", error);
    }
    router.push("/report");
  };

  return (
    <section className="min-h-screen bg-[#FEFBF5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto container">
        <InspectionHeader/>

        <InspectionTabs
          steps={steps}
          currentStep={currentStep.key}
          onStepClick={(step) => {
            const index = steps.findIndex((s) => s.key === step);
            if (index >= 0) setCurrentStepIndex(index);
          }}
        />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_290px]">
          <div>
            {stepContent}

            <div className="mt-4">
              {currentStep.key === "finalSummary" ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="h-[42px] w-full rounded-[6px] bg-[#f4bc18] text-sm font-semibold text-black hover:bg-[#e5ad08]"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-[42px] w-full rounded-[6px] bg-[#f4bc18] text-sm font-semibold text-black hover:bg-[#e5ad08]"
                >
                  Next
                </Button>
              )}
            </div>
          </div>

          <div className="xl:sticky xl:top-6 xl:self-start">
            <InspectionProgressSidebar
              steps={steps}
              currentStep={currentStep.key}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
