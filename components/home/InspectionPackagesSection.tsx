"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// Types based on your API response
interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  title: string;
  features: string[];
  status: string;
  // add other fields if needed
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    items: Plan[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
}

// Skeleton Card Component
function PackageSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#6F8DFF] bg-white shadow-sm">
      <div className="border-b bg-[#FFF9E9] px-4 py-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
      </div>
      <div className="px-5 pb-6 pt-5">
        <div className="flex justify-center">
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mx-auto mt-4 h-10 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto mt-6 h-6 w-32 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="mt-1 h-4 w-4 animate-pulse rounded bg-gray-300" />
              <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="mt-7 h-12 w-full animate-pulse rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

export default function InspectionPackagesSection() {
  const session = useSession();
  const token = session?.data?.accessToken;
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["inspectionPlans"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch plans: ${res.statusText}`);
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const plans = data?.data?.items || [];

  // Sort to keep the same order as your original design: Basic → Plus → Complete
  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
  const pricesToShow = sortedPlans.map((plan) => plan.price);

  const handleCheckout = async (planId: string) => {
    try {
      setCheckoutError(null);
      setPendingPlanId(planId);

      if (!token) throw new Error("No authentication token found");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription/buy/${planId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to create checkout: ${res.statusText}`);
      }

      const payload = await res.json();
      const checkoutUrl = payload?.data?.url;

      if (!checkoutUrl) {
        throw new Error("Checkout URL missing in response");
      }

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setCheckoutError("Unable to start checkout. Please try again.");
    } finally {
      setPendingPlanId(null);
    }
  };

  return (
    <section className="w-full bg-[#F3F3F3] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Content - unchanged */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#131313] sm:text-3xl md:text-4xl">
            AutoIntel Inspection Packages Comprehensive 270-point evaluation
            and road test
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-3xl font-extrabold text-[#006600] sm:text-5xl">
            {(pricesToShow.length ? pricesToShow : [175, 180, 189]).flatMap(
              (price, index) => [
                <span key={`bullet-${price}-${index}`}>•</span>,
                <span key={`price-${price}-${index}`}>${price}</span>,
              ],
            )}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-[#006600] sm:text-3xl md:text-4xl">
            🚗 Choose Your Inspection Level 🚗
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#131313] sm:text-base">
            Inspection packages include a{" "}
            <span className="text-[#F30000]">
              comprehensive 270-point evaluation and road test
            </span>
            , provided the vehicle is roadworthy and the seller or dealer
            authorizes a test drive.
          </p>
        </div>

        {checkoutError ? (
          <div className="mt-6 text-center text-sm font-semibold text-red-600">
            {checkoutError}
          </div>
        ) : null}

        {/* Cards / Skeleton */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
            </>
          ) : error ? (
            <div className="col-span-full py-12 text-center text-red-600">
              Failed to load inspection plans. Please try again later.
            </div>
          ) : (
            sortedPlans.map((plan) => {
              const isFeatured = plan.name.toLowerCase().includes("plus");
              const isMostPopular = plan.name.toLowerCase().includes("complete");

              return (
                <div key={plan._id} className="relative">
                  {isMostPopular && (
                    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded bg-[#FBBF24] px-3 py-1 text-sm font-bold text-[#131313] shadow">
                      Most Popular
                    </div>
                  )}

                  <div
                    className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-all ${
                      isFeatured
                        ? "border-[#3A57B6] shadow-lg"
                        : "border-[#6F8DFF]"
                    }`}
                  >
                    {/* Header */}
                    <div
                      className={`border-b px-4 py-4 text-center ${
                        isFeatured
                          ? "bg-[#3258DA] border-[#3258DA]"
                          : "bg-[#FFF9E9] border-[#6F8DFF]"
                      }`}
                    >
                      <h4
                        className={`text-xl font-semibold ${
                          isFeatured ? "text-white" : "text-[#3258DA]"
                        }`}
                      >
                        {plan.name}
                      </h4>
                    </div>

                    {/* Body */}
                    <div className="px-5 pb-6 pt-5">
                      <div className="text-center">
                        <span className="inline-block rounded bg-[#FFF9E9] px-3 py-1 text-sm font-medium text-[#1E3A8A]">
                          {plan.title}
                        </span>

                        <div className="mt-4 text-4xl font-extrabold text-[#222222]">
                          ${plan.price}
                        </div>

                        <div className="mx-auto mt-4 w-fit bg-[#EEF1FF] px-5 py-1.5 text-sm font-bold uppercase tracking-wide text-[#4338CA]">
                          This Plan Includes
                        </div>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-[#131313]"
                          >
                            <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#11801A] text-white">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="mt-7 h-12 w-full rounded-md bg-[#F4BC17] text-sm font-bold text-[#222222] hover:bg-[#e2ac10]"
                        disabled={pendingPlanId === plan._id}
                        onClick={() => handleCheckout(plan._id)}
                      >
                        {pendingPlanId === plan._id ? "Redirecting..." : "Continue"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
