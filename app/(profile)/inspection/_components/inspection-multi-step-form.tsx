"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
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

const REQUIRED_PHOTO_ITEMS = [
  { title: "Front Interior", fieldName: "frontInterior" },
  { title: "Front Exterior", fieldName: "frontExterior" },
  { title: "Passenger Side", fieldName: "passengerSide" },
  { title: "Left Fender", fieldName: "leftFender" },
  { title: "Right Fender", fieldName: "rightFender" },
  { title: "Left Quarter Panel", fieldName: "leftQuarterPanel" },
  { title: "Right Quarter Panel", fieldName: "rightQuarterPanel" },
  { title: "Rear Exterior", fieldName: "rearExterior" },
  { title: "Front Bumper", fieldName: "frontBumper" },
  { title: "Rear Bumper", fieldName: "rearBumper" },
  { title: "Engine Bay", fieldName: "engineBay" },
  { title: "VIN Plate", fieldName: "vinPlate" },
  { title: "Odometer / Mileage", fieldName: "odometer" },
  { title: "Dashboard Console", fieldName: "dashboardConsole" },
  { title: "Front Seats - Driver", fieldName: "frontSeatsDriver" },
  { title: "Front Seats - Passenger", fieldName: "frontSeatsPassenger" },
  { title: "Rear Seats - Driver Side", fieldName: "rearSeatsDriverSide" },
  { title: "Rear Seats - Passenger Side", fieldName: "rearSeatsPassengerSide" },
  { title: "Flooring", fieldName: "flooring" },
  { title: "Roof Interior", fieldName: "roofInterior" },
  { title: "Undercarriage - Front", fieldName: "undercarriageFront" },
  { title: "Undercarriage - Rear", fieldName: "undercarriageRear" },
  { title: "Trunk Interior", fieldName: "trunkInterior" },
  { title: "Wheel Photo - Driver Front", fieldName: "wheelPhotoDriverFront" },
  { title: "Wheel Photo - Passenger Front", fieldName: "wheelPhotoPassengerFront" },
  { title: "Wheel Photo - Driver Rear", fieldName: "wheelPhotoDriverRear" },
  { title: "Wheel Photo - Passenger Rear", fieldName: "wheelPhotoPassengerRear" },
];

const VEHICLE_DOCUMENTATION_ITEMS = [
  { title: "Owner manual present", fieldName: "ownerManualPresent" },
  { title: "Service history", fieldName: "serviceHistory" },
  { title: "Oil change record", fieldName: "oilChangeRecord" },
  { title: "Major service record", fieldName: "majorServiceRecord" },
  { title: "CarFax/AutoCheck", fieldName: "carfaxAutoCheck" },
  { title: "Key count", fieldName: "keyCount" },
  { title: "Glovebox key", fieldName: "gloveboxKey" },
];

const VEHICLE_TIRES_BRAKES_ITEMS = [
  { title: "Tire size match", fieldName: "tireSizeMatch" },
  { title: "Spare tire present", fieldName: "spareTirePresent" },
  { title: "Tread depth DF", fieldName: "treadDepthDF" },
  { title: "Tread depth PF", fieldName: "treadDepthPF" },
  { title: "Tread depth DR", fieldName: "treadDepthDR" },
  { title: "Tread depth PR", fieldName: "treadDepthPR" },
  { title: "Brake pads front", fieldName: "brakePadsFront" },
  { title: "Brake pads rear", fieldName: "brakePadsRear" },
];

const VEHICLE_EXTERIOR_ITEMS = [
  { title: "Front alignment", fieldName: "frontAlignment" },
  { title: "Hood", fieldName: "hood" },
  { title: "Front bumper", fieldName: "frontBumper" },
  { title: "Grille", fieldName: "grille" },
  { title: "Windshield", fieldName: "windshield" },
  { title: "Lights", fieldName: "lights" },
  { title: "Left doors", fieldName: "leftDoors" },
  { title: "Left rocker", fieldName: "leftRocker" },
  { title: "Left mirror", fieldName: "leftMirror" },
  { title: "Right doors", fieldName: "rightDoors" },
  { title: "Right rocker", fieldName: "rightRocker" },
  { title: "Right mirror", fieldName: "rightMirror" },
  { title: "Rear bumper", fieldName: "rearBumper" },
  { title: "Tailgate", fieldName: "tailgate" },
  { title: "Quarter panels", fieldName: "quarterPanels" },
  { title: "Rear lights", fieldName: "rearLights" },
];

const VEHICLE_ENGINE_ITEMS = [
  { title: "Oil level", fieldName: "oilLevel" },
  { title: "Coolant level", fieldName: "coolantLevel" },
  { title: "Leaks", fieldName: "leaks" },
  { title: "Belts", fieldName: "belts" },
  { title: "Hoses", fieldName: "hoses" },
  { title: "Battery", fieldName: "battery" },
  { title: "Air filter", fieldName: "airFilter" },
];

const VEHICLE_INTERIOR_ITEMS = [
  { title: "Odor", fieldName: "odor" },
  { title: "Driver seat", fieldName: "driverSeat" },
  { title: "Passenger seat", fieldName: "passengerSeat" },
  { title: "Seat belts", fieldName: "seatBelts" },
  { title: "Dash", fieldName: "dash" },
  { title: "Console", fieldName: "console" },
  { title: "Windows", fieldName: "windows" },
  { title: "Locks", fieldName: "locks" },
  { title: "Infotainment", fieldName: "infotainment" },
  { title: "HVAC", fieldName: "hvac" },
  { title: "Rear seats", fieldName: "rearSeats" },
  { title: "Rear belts", fieldName: "rearBelts" },
  { title: "Cargo area", fieldName: "cargoArea" },
];

const VEHICLE_FLUIDS_ITEMS = [
  { title: "Engine oil", fieldName: "engineOil" },
  { title: "Transmission fluid", fieldName: "transmissionFluid" },
  { title: "Brake fluid", fieldName: "brakeFluid" },
  { title: "Coolant", fieldName: "coolant" },
  { title: "Power steering", fieldName: "powerSteering" },
  { title: "Washer fluid", fieldName: "washerFluid" },
];

const VEHICLE_ROAD_TEST_ITEMS = [
  { title: "Startup", fieldName: "startup" },
  { title: "Idle", fieldName: "idle" },
  { title: "Acceleration", fieldName: "acceleration" },
  { title: "Transmission", fieldName: "transmission" },
  { title: "Steering", fieldName: "steering" },
  { title: "Brakes", fieldName: "brakes" },
  { title: "Noise", fieldName: "noises" },
  { title: "Suspension", fieldName: "suspension" },
  { title: "Vibration", fieldName: "vibration" },
  { title: "Cruise", fieldName: "cruise" },
  { title: "AWD/4x4", fieldName: "awd4x4" },
];

const VEHICLE_SCAN_TOOL_ITEMS = [
  { title: "Stored codes", fieldName: "storedCodes" },
  { title: "Pending codes", fieldName: "pendingCodes" },
  { title: "Monitor readiness", fieldName: "monitorReadiness" },
];

const VEHICLE_FOCUS_AREAS_ITEMS = [
  { title: "Previous damage", fieldName: "previousDamage" },
  { title: "Rust", fieldName: "rust" },
  { title: "Leaks", fieldName: "leaks" },
  { title: "Suspicious noises", fieldName: "suspiciousNoises" },
];

function createTextItems(
  items: Array<{ title: string; fieldName?: string }>
): TextChecklistItem[] {
  return items.map((item, index) => ({
    id: `${item.title}-${index}`,
    title: item.title,
    fieldName: item.fieldName,
    status: "",
    note: "",
  }));
}

function createPhotoItems(
  items: Array<{ title: string; fieldName?: string }>
): PhotoChecklistItem[] {
  return items.map((item, index) => ({
    id: `${item.title}-${index}`,
    title: item.title,
    fieldName: item.fieldName,
    file: null,
    preview: "",
  }));
}

const initialData: InspectionFormData = {
  requiredPhotos: createPhotoItems(REQUIRED_PHOTO_ITEMS),
  additionalPhotos: createPhotoItems([
    { title: "Additional Photo #1" },
    { title: "Additional Photo #2" },
    { title: "Additional Photo #3" },
    { title: "Additional Photo #4" },
    { title: "Additional Photo #5" },
  ]),
  vehicleRepresentation: createTextItems(VEHICLE_DOCUMENTATION_ITEMS),
  tiresBrakes: createTextItems(VEHICLE_TIRES_BRAKES_ITEMS),
  exterior: createTextItems(VEHICLE_EXTERIOR_ITEMS),
  engine: createTextItems(VEHICLE_ENGINE_ITEMS),
  interior: createTextItems(VEHICLE_INTERIOR_ITEMS),
  fluidCheck: createTextItems(VEHICLE_FLUIDS_ITEMS),
  roadTest: createTextItems(VEHICLE_ROAD_TEST_ITEMS),
  scanTool: createTextItems(VEHICLE_SCAN_TOOL_ITEMS),
  focusAreas: createTextItems(VEHICLE_FOCUS_AREAS_ITEMS),
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

export function InspectionMultiStepForm({ bookingId }: { bookingId?: string }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<InspectionFormData>(initialData);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [checklistId, setChecklistId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken as string | undefined;

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

  const buildTextPayload = (items: TextChecklistItem[]) => {
    return items.reduce((acc, item) => {
      if (!item.fieldName) return acc;
      const status = item.status === "report" ? false : true;
      acc[item.fieldName] = {
        status,
        notes: item.note?.trim() ?? "",
      };
      return acc;
    }, {} as Record<string, { status: boolean; notes: string }>);
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

  const uploadPhotoChecklist = async () => {
    if (!bookingId) {
      setUploadError("Booking ID is missing. Please reload and try again.");
      return false;
    }

    const formPayload = new FormData();
    formPayload.append("bookingId", bookingId);

    formData.requiredPhotos.forEach((item) => {
      if (!item.file) return;
      if (item.fieldName) {
        formPayload.append(item.fieldName, item.file, item.file.name);
      }
    });

    formData.additionalPhotos.forEach((item) => {
      if (!item.file) return;
      formPayload.append("additionalPhotos", item.file, item.file.name);
    });

    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspection-checklists/photo-upload`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: formPayload,
        }
      );

      if (!response.ok) {
        let message = "Failed to upload photos. Please try again.";
        try {
          const json = await response.json();
          if (json?.message) {
            message = json.message;
          }
        } catch (error) {
          console.error("Failed to parse upload response", error);
        }
        setUploadError(message);
        return false;
      }

      try {
        const json = await response.json();
        const resolvedChecklistId =
          json?.checklistId ??
          json?.data?.checklistId ??
          json?.data?._id ??
          json?._id ??
          json?.data?.id ??
          json?.id ??
          null;
        if (resolvedChecklistId) {
          setChecklistId(String(resolvedChecklistId));
        }
      } catch (error) {
        console.error("Failed to read checklist id from response", error);
      }

      return true;
    } catch (error) {
      console.error("Photo upload error", error);
      setUploadError("Network error while uploading photos. Please try again.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep.key === "additionalPhotos") {
      if (isUploading) return;
      const ok = await uploadPhotoChecklist();
      if (ok) nextStep();
      return;
    }

    nextStep();
  };

  const buildVehicleChecklistPayload = () => {
    const summaryNote = formData.finalSummary.note.trim();

    return {
      title: "Inspection Checklist",
      notes: summaryNote,
      checklistId,
      bookingId,
      vehicleDocumentation: buildTextPayload(formData.vehicleRepresentation),
      vehicleTiresBrakes: buildTextPayload(formData.tiresBrakes),
      vehicleExterior: buildTextPayload(formData.exterior),
      vehicleEngine: buildTextPayload(formData.engine),
      vehicleInterior: buildTextPayload(formData.interior),
      vehicleFluids: buildTextPayload(formData.fluidCheck),
      vehicleRoadTest: buildTextPayload(formData.roadTest),
      vehicleScanTool: buildTextPayload(formData.scanTool),
      vehicleFocusAreas: buildTextPayload(formData.focusAreas),
      finalSummary: {
        notes: summaryNote,
      },
    };
  };

  const submitVehicleChecklist = async () => {
    if (!bookingId) {
      toast.error("Booking ID is missing. Please reload and try again.");
      return false;
    }

    if (!checklistId) {
      toast.error("Checklist ID is missing. Please upload photos first.");
      return false;
    }

    const payload = buildVehicleChecklistPayload();

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspection-checklists/vehicle-documentation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let message = "Failed to submit checklist. Please try again.";
        try {
          const json = await response.json();
          if (json?.message) {
            message = json.message;
          }
        } catch (error) {
          console.error("Failed to parse checklist response", error);
        }
        toast.error(message);
        return false;
      }

      toast.success("Checklist submitted successfully.");
      return true;
    } catch (error) {
      console.error("Checklist submission error", error);
      toast.error("Network error while submitting checklist.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const ok = await submitVehicleChecklist();
    if (!ok) return;

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
                  disabled={isSubmitting}
                  className="h-[42px] w-full rounded-[6px] bg-[#f4bc18] text-sm font-semibold text-black hover:bg-[#e5ad08]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isUploading}
                  className="h-[42px] w-full rounded-[6px] bg-[#f4bc18] text-sm font-semibold text-black hover:bg-[#e5ad08]"
                >
                  {currentStep.key === "additionalPhotos" && isUploading
                    ? "Uploading..."
                    : "Next"}
                </Button>
              )}
            </div>

            {uploadError ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {uploadError}
              </p>
            ) : null}
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
