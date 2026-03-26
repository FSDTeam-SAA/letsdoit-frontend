"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, ImageOff, Star } from "lucide-react";
import type { TextChecklistItem } from "@/app/(profile)/inspection/_components/inspection";

type ReportPhotoItem = {
  id: string;
  title: string;
  fileName?: string;
  preview?: string;
};

type ReportData = {
  requiredPhotos: ReportPhotoItem[];
  additionalPhotos: ReportPhotoItem[];
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
  submittedAt?: string;
};

type TextSectionKey =
  | "vehicleRepresentation"
  | "tiresBrakes"
  | "exterior"
  | "engine"
  | "interior"
  | "fluidCheck"
  | "roadTest"
  | "scanTool"
  | "focusAreas";

const textSectionMeta: { key: TextSectionKey; title: string }[] = [
  { key: "vehicleRepresentation", title: "Vehicle Documentation" },
  { key: "tiresBrakes", title: "Tires & Brakes" },
  { key: "exterior", title: "Exterior" },
  { key: "engine", title: "Engine" },
  { key: "interior", title: "Interior" },
  { key: "fluidCheck", title: "Fluid Check" },
  { key: "roadTest", title: "Road Test" },
  { key: "scanTool", title: "Scan Tool" },
  { key: "focusAreas", title: "Focus Areas" },
];

const emptyReportData: ReportData = {
  requiredPhotos: [],
  additionalPhotos: [],
  vehicleRepresentation: [],
  tiresBrakes: [],
  exterior: [],
  engine: [],
  interior: [],
  fluidCheck: [],
  roadTest: [],
  scanTool: [],
  focusAreas: [],
  finalSummary: { note: "" },
};

type ProgressStyle = CSSProperties & { "--progress"?: string };

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="py-6 text-center">
      <h2 className="text-[16px] font-semibold uppercase tracking-[0.22em] text-[#131313]">
        {title}
      </h2>
    </div>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-[#d7d7d7]" />;
}

function InfoGrid({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
      {rows.map((row) => (
        <div key={row.label}>
          <p className="text-[16px] font-medium uppercase tracking-wide text-[#131313]">
            {row.label}
          </p>
          <p className="mt-1 text-[16px] font-semibold text-[#131313]">
            {row.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ResultBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[16px] font-semibold text-[#131313] ${
        normalized === "ok"
          ? "bg-green-100"
          : normalized === "report"
          ? "bg-amber-100"
          : "bg-[#f2f2f2]"
      }`}
    >
      {value}
    </span>
  );
}

function InspectionTable({
  title,
  rows,
}: {
  title: string;
  rows: { item: string; result: string; comment: string }[];
}) {
  const tableRows =
    rows.length > 0
      ? rows
      : [
          {
            item: "No items available",
            result: "Pending",
            comment: "—",
          },
        ];

  return (
    <section>
      <SectionTitle title={title} />

      <div className="overflow-hidden rounded-[10px] border border-[#d8d8d8] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[#d8d8d8] bg-[#fafafa]">
                <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#131313]">
                  Area
                </th>
                <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#131313]">
                  Result
                </th>
                <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#131313]">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-b border-[#ececec] last:border-b-0">
                  <td className="px-4 py-3 text-[16px] text-[#131313]">
                    {row.item}
                  </td>
                  <td className="px-4 py-3">
                    <ResultBadge value={row.result} />
                  </td>
                  <td className="px-4 py-3 text-[16px] text-[#131313]">
                    {row.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function GallerySection({
  title,
  items,
}: {
  title: string;
  items: ReportPhotoItem[];
}) {
  const galleryItems =
    items.length > 0
      ? items
      : [
          {
            id: "empty",
            title: "No photos uploaded",
          },
        ];

  return (
    <section>
      <SectionTitle title={title} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {galleryItems.map((image) => {
          const isDynamic =
            image.preview?.startsWith("data:") ||
            image.preview?.startsWith("blob:");
          const hasPreview = Boolean(image.preview);

          return (
            <div
              key={image.id}
              className="overflow-hidden rounded-[6px] border border-[#d8d8d8] bg-white"
            >
              {hasPreview ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={image.preview as string}
                    alt={image.title}
                    fill
                    className="object-cover"
                    unoptimized={Boolean(isDynamic)}
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f4f4f4]">
                  <div className="flex flex-col items-center gap-2">
                    <ImageOff className="h-6 w-6 text-[#9a9a9a]" />
                    <p className="text-[16px] font-medium text-[#131313]">
                      No image uploaded
                    </p>
                  </div>
                </div>
              )}
              <div className="px-2 py-1">
                <p className="truncate text-[16px] font-medium text-[#131313]">
                  {image.title}
                </p>
                {image.fileName ? (
                  <p className="truncate text-[16px] text-[#131313]">
                    {image.fileName}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function formatReportDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getResultLabel(status: TextChecklistItem["status"]) {
  if (status === "ok") return "OK";
  if (status === "report") return "Report";
  return "Pending";
}

function buildTableRows(items: TextChecklistItem[]) {
  return items.map((item) => ({
    item: item.title,
    result: getResultLabel(item.status),
    comment: item.note?.trim() ? item.note : "—",
  }));
}

function normalizeReportData(raw?: Partial<ReportData> | null): ReportData {
  if (!raw) return emptyReportData;

  return {
    ...emptyReportData,
    ...raw,
    requiredPhotos: raw.requiredPhotos ?? [],
    additionalPhotos: raw.additionalPhotos ?? [],
    vehicleRepresentation: raw.vehicleRepresentation ?? [],
    tiresBrakes: raw.tiresBrakes ?? [],
    exterior: raw.exterior ?? [],
    engine: raw.engine ?? [],
    interior: raw.interior ?? [],
    fluidCheck: raw.fluidCheck ?? [],
    roadTest: raw.roadTest ?? [],
    scanTool: raw.scanTool ?? [],
    focusAreas: raw.focusAreas ?? [],
    finalSummary: raw.finalSummary ?? { note: "" },
  };
}

export default function VehicleInspectionReportPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("inspectionReportData");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ReportData>;
        setReportData(normalizeReportData(parsed));
      }
    } catch (error) {
      console.error("Failed to read inspection report data", error);
    }
  }, []);

  const data = reportData ?? emptyReportData;

  const {
    overviewRows,
    reportDate,
    percent,
    summaryText,
    heroPhoto,
    overviewPhoto,
  } = useMemo(() => {
    const requiredUploaded = data.requiredPhotos.filter(
      (item) => item.preview || item.fileName
    ).length;
    const additionalUploaded = data.additionalPhotos.filter(
      (item) => item.preview || item.fileName
    ).length;
    const totalPhotos = data.requiredPhotos.length + data.additionalPhotos.length;
    const uploadedPhotos = requiredUploaded + additionalUploaded;

    const allTextItems = textSectionMeta.flatMap(
      (section) => data[section.key] ?? []
    );
    const okCount = allTextItems.filter((item) => item.status === "ok").length;
    const reportCount = allTextItems.filter(
      (item) => item.status === "report"
    ).length;
    const pendingCount = allTextItems.length - okCount - reportCount;

    const summaryNote = data.finalSummary?.note?.trim() ?? "";
    const summaryText = summaryNote || "No final summary provided.";

    const totalItems = allTextItems.length + totalPhotos + 1;
    const completedItems =
      okCount + reportCount + uploadedPhotos + (summaryNote ? 1 : 0);
    const percent = totalItems
      ? Math.round((completedItems / totalItems) * 100)
      : 0;

    const reportDate = formatReportDate(data.submittedAt);
    const heroPhoto = data.requiredPhotos.find(
      (item) => item.preview
    )?.preview || "";
    const overviewPhoto =
      data.additionalPhotos.find((item) => item.preview)?.preview || heroPhoto;

    const overviewRows = [
      {
        label: "Required photos",
        value: `${requiredUploaded}/${data.requiredPhotos.length}`,
      },
      {
        label: "Additional photos",
        value: `${additionalUploaded}/${data.additionalPhotos.length}`,
      },
      { label: "OK items", value: `${okCount}` },
      { label: "Reported items", value: `${reportCount}` },
      { label: "Pending items", value: `${pendingCount}` },
      { label: "Completion", value: `${percent}%` },
    ];

    return {
      overviewRows,
      reportDate,
      percent,
      summaryText,
      heroPhoto,
      overviewPhoto,
    };
  }, [data]);

  const progressStyle: ProgressStyle = {
    "--progress": `${percent * 3.6}deg`,
  };

  return (
    <section className="min-h-screen bg-[#f7f7f5] px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto container">
        <div className="overflow-hidden rounded-[10px] border border-[#dadada] bg-white shadow-sm">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Header logo area */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded border border-[#d9d9d9] bg-white px-3 py-2 text-[16px] font-semibold text-[#131313]">
                VEHICLE REPORT
              </div>

              <div className="text-center">
                <h1 className="text-[20px] font-bold uppercase tracking-[0.16em] text-[#111] sm:text-[28px]">
                  Inspection Report
                </h1>
              </div>
            </div>

            <Divider />

            {/* Main image */}
            <div className="mx-auto max-w-[320px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-[#ddd]">
                {heroPhoto ? (
                  <Image
                    src={heroPhoto}
                    alt="Inspection hero"
                    fill
                    className="object-cover"
                    unoptimized={
                      heroPhoto.startsWith("data:") ||
                      heroPhoto.startsWith("blob:")
                    }
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#f4f4f4]">
                    <div className="flex flex-col items-center gap-2">
                      <ImageOff className="h-7 w-7 text-[#9a9a9a]" />
                      <p className="text-[16px] font-medium text-[#131313]">
                        No image uploaded
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-1 text-[16px] font-medium uppercase tracking-[0.18em] text-[#131313]">
                <Star className="h-3.5 w-3.5 fill-[#f0b400] text-[#f0b400]" />
                {reportDate || "—"}
              </div>
            </div>

            <Divider />

            {/* Score */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[conic-gradient(#1f7a1f_var(--progress),#e5e5e5_0)] p-[10px]"
                style={progressStyle}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <span className="text-[16px] font-bold text-[#131313]">
                    {percent}%
                  </span>
                </div>
              </div>

              <Card className="mt-6 max-w-[520px] border border-[#eadfbf] bg-[#fbf4df] shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-[#7b5b00]" />
                    <p className="text-[16px] leading-6 text-[#131313]">
                      {summaryText}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Divider />

            {/* Overview */}
            <SectionTitle title="Overview" />

            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
              <div>
                <InfoGrid rows={overviewRows} />
              </div>

              <div className="rounded-[10px] border border-[#d8d8d8] bg-white p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
                  {overviewPhoto ? (
                    <Image
                      src={overviewPhoto}
                      alt="Vehicle overview"
                      fill
                      className="object-cover"
                      unoptimized={
                        overviewPhoto.startsWith("data:") ||
                        overviewPhoto.startsWith("blob:")
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f4f4f4]">
                      <div className="flex flex-col items-center gap-2">
                        <ImageOff className="h-6 w-6 text-[#9a9a9a]" />
                        <p className="text-[16px] font-medium text-[#131313]">
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[16px] text-[#131313]">
                    <span>Overall score</span>
                    <span className="font-semibold">{percent}%</span>
                  </div>
                  <Progress value={percent} className="mt-2 h-2" />
                </div>
              </div>
            </div>

            <Divider />

            <InspectionTable
              title="Vehicle Documentation"
              rows={buildTableRows(data.vehicleRepresentation)}
            />

            <Divider />

            <InspectionTable
              title="Tires & Brakes"
              rows={buildTableRows(data.tiresBrakes)}
            />

            <Divider />

            <InspectionTable title="Exterior" rows={buildTableRows(data.exterior)} />

            <Divider />

            <GallerySection title="Required Photos" items={data.requiredPhotos} />

            <Divider />

            <GallerySection
              title="Additional Photos"
              items={data.additionalPhotos}
            />

            <Divider />

            <InspectionTable title="Interior" rows={buildTableRows(data.interior)} />

            <Divider />

            <InspectionTable title="Engine" rows={buildTableRows(data.engine)} />

            <Divider />

            <InspectionTable title="Road Test" rows={buildTableRows(data.roadTest)} />

            <Divider />

            <InspectionTable
              title="Fluid Check"
              rows={buildTableRows(data.fluidCheck)}
            />

            <Divider />

            <InspectionTable title="Scan Tool" rows={buildTableRows(data.scanTool)} />

            <Divider />

            <InspectionTable
              title="Focus Areas"
              rows={buildTableRows(data.focusAreas)}
            />

            <Divider />

            {/* Final Summary */}
            <section>
              <SectionTitle title="Final Summary" />

              <div className="rounded-[10px] border border-[#d8d8d8] bg-white p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-700" />
                  <p className="text-[16px] leading-6 text-[#131313]">
                    {summaryText}
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </div>
      </div>
    </section>
  );
}
