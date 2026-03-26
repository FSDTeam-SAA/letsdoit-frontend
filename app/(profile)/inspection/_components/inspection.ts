export type StepKey =
  | "requiredPhotos"
  | "additionalPhotos"
  | "vehicleRepresentation"
  | "tiresBrakes"
  | "exterior"
  | "engine"
  | "interior"
  | "fluidCheck"
  | "roadTest"
  | "scanTool"
  | "focusAreas"
  | "finalSummary";

export type CheckStatus = "ok" | "report" | "";

export type TextChecklistItem = {
  id: string;
  title: string;
  fieldName?: string;
  status: CheckStatus;
  note: string;
};

export type PhotoChecklistItem = {
  id: string;
  title: string;
  fieldName?: string;
  file: File | null;
  preview: string;
};

export type StepDefinition = {
  key: StepKey;
  label: string;
};

export type InspectionFormData = {
  requiredPhotos: PhotoChecklistItem[];
  additionalPhotos: PhotoChecklistItem[];
  vehicleRepresentation: TextChecklistItem[];
  tiresBrakes: TextChecklistItem[];
  exterior: TextChecklistItem[];
  engine: TextChecklistItem[];
  interior: TextChecklistItem[];
  fluidCheck: TextChecklistItem[];
  roadTest: TextChecklistItem[];
  scanTool: TextChecklistItem[];
  focusAreas: TextChecklistItem[];
  finalSummary: {
    note: string;
  };
};
