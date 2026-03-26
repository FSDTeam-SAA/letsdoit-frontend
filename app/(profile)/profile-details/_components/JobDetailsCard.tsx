"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft, CarFront, CircleUserRound, ClipboardList, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// Types
interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

interface BookingData {
  _id: string;
  customer: Customer;
  inspector: null ;
  date: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  vehicleLocation: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: BookingData;
}

// Skeleton Component
function InfoItemSkeleton() {
  return (
    <div className="border-b border-[#cfcfcf] pb-2">
      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="mt-2 h-7 w-48 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="container mx-auto">
      <div className="mb-5 flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <InfoItemSkeleton key={i} />
        ))}
      </div>
      <div className="mt-3">
        <InfoItemSkeleton />
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-b border-[#cfcfcf] pb-2">
      <p className="text-[16px] font-medium text-[#000000]">{label}</p>
      <p className="mt-1 text-[20px] font-medium leading-[1.35] text-[#000000]">
        {value || "—"}
      </p>
    </div>
  );
}

export default function JobDetailsCard() {
  const { id } = useParams() as { id: string };
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["booking", id, token],
    queryFn: async (): Promise<ApiResponse> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/booking-inspect/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.statusText}`);
      }

      return response.json();
    },
    enabled: !!id && status === "authenticated" && !!token,
  });

  const booking = data?.data;

  // Format date nicely
  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  if (error) {
    return (
      <section className="min-h-screen bg-[#FEFBF5] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center py-12">
          <p className="text-red-600 font-medium">Failed to load booking details. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FEFBF5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto container ">
        {/* Back button */}
        <div className="mb-4">
          <Link href="/profile">
            <Button
              variant="outline"
              className="h-[32px] rounded-full border-black bg-[#FEFBF5] px-4 text-[12px] font-medium text-black hover:bg-white"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back
            </Button>
          </Link>
        </div>

        {/* Main card */}
        <div className="rounded-[14px] border border-[#B6B6B6] bg-[#FFFFFF] shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          <CardContent className="p-5 sm:p-7 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {/* Customer Information */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <CircleUserRound className="h-4 w-4 text-[#222222]" />
                  <h2 className="text-[24px] font-medium text-[#424242]">
                    Customer Information:
                  </h2>
                </div>

                {isLoading ? (
                  <SectionSkeleton />
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8">
                    <InfoItem label="First Name:" value={booking?.customer?.firstName || ""} />
                    <InfoItem label="Last Name:" value={booking?.customer?.lastName || ""} />
                    <InfoItem 
                      label="Schedule Date:" 
                      value={booking?.date ? formatDate(booking.date) : ""} 
                    />
                  </div>
                )}
              </div>

              {/* Vehicle Information */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <CarFront className="h-4 w-4 text-[#222222]" />
                  <h2 className="text-[24px] font-medium text-[#424242]">
                    Vehicle Information:
                  </h2>
                </div>

                {isLoading ? (
                  <SectionSkeleton />
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8">
                    <InfoItem 
                      label="Vehicle:" 
                      value={`${booking?.year || ""} ${booking?.make || ""} ${booking?.model || ""}`.trim() || "—"} 
                    />
                    <InfoItem label="VIN:" value={booking?.vin || ""} />
                    <InfoItem label="Address:" value={booking?.vehicleLocation || ""} />
                    {booking?.message && (
                      <InfoItem label="Special Instructions:" value={booking.message} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom action */}
            <div className="mt-8 flex justify-center">
              <Link href={`/inspection/${id}`}>
                <Button 
                  disabled={isLoading}
                  className="h-[42px] w-full max-w-[860px] rounded-full bg-[#FBBF24] px-6 text-[16px] font-bold text-[#131313] hover:bg-[#e3a910] disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Take Inspection Checklist by 50 questions
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </section>
  );
}
