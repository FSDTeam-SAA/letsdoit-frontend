
import AutoIntelHeader from "../../_components/AutoIntelHeader";
import { InspectionMultiStepForm } from "../_components/inspection-multi-step-form";

export default function InspectionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <AutoIntelHeader />
      <InspectionMultiStepForm bookingId={params.id} />
    </>
  );
}
