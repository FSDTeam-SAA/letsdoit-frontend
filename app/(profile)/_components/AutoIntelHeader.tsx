"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

type UserProfileResponse = {
  status: boolean;
  message?: string;
  data?: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    profileImage?: string;
    avatar?: string;
    image?: string;
    photo?: string;
  };
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase() || "U";
};

export default function AutoIntelHeader() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data: profileData } = useQuery<UserProfileResponse, Error>({
    queryKey: ["user-me", token],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server responded with status ${response.status}`,
        );
      }

      const json = await response.json();
      if (!json?.status) {
        throw new Error(json?.message || "Failed to fetch user profile");
      }

      return json;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const profile = profileData?.data;
  const composedName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName =
    composedName ||
    profile?.name ||
    session?.user?.name ||
    profile?.email?.split("@")[0] ||
    "User";
  const avatarUrl =
    profile?.profileImage ||
    profile?.avatar ||
    profile?.image ||
    profile?.photo ||
    "";
  const initials = getInitials(displayName);

  return (
    <header className="w-full shadow-xl border-gray-200 bg-[#FFFFFF]">
      <div className="mx-auto flex w-full container items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
        {/* Left Side */}
        <Link href="/" className="flex shrink-0 items-center gap-3 lg:gap-2 xl:gap-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#FBBF24] lg:h-[30px] lg:w-[30px] xl:h-[58px] xl:w-[58px]">
            <span className="text-[18px] font-bold leading-none text-[#131313] lg:text-[16px] xl:text-[32px]">
              AI
            </span>
          </div>

          <div className="leading-tight">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.02em] text-[#131313] lg:text-[13px] xl:text-[20px]">
              AUTO INTEL
            </h2>
            <p className="text-[11px] font-medium text-[#424242] lg:text-[10px] xl:text-[16px]">
              Pre-Purchase Inspection Experts
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-sm font-semibold text-[#222] sm:block">
            Welcome
          </span>

          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`${displayName} avatar`}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-[#222]">
                {initials}
              </span>
            )}
          </div>

          <div className="hidden text-sm font-medium text-[#222] md:block">
            {displayName}
          </div>

          {/* <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-200"
          >
            <ChevronDown size={18} />
          </button> */}
        </div>
      </div>
    </header>
  );
}
