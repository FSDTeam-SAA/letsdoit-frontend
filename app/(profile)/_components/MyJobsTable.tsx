"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

// Skeleton Component
function JobSkeleton({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <Card className="rounded-[10px] border border-[#ece7dd] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-48 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-full bg-gray-200 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  // Desktop Table Row Skeleton
  return (
    <tr className="border-b border-[#B6B6B6]">
      <td className="px-6 py-6"><div className="h-5 w-40 bg-gray-200 rounded" /></td>
      <td className="px-6 py-6"><div className="h-5 w-36 bg-gray-200 rounded" /></td>
      <td className="px-6 py-6"><div className="h-5 w-52 bg-gray-200 rounded" /></td>
      <td className="px-6 py-6"><div className="h-5 w-24 bg-gray-200 rounded" /></td>
      <td className="px-6 py-6"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
      <td className="px-6 py-6 text-center">
        <div className="h-7 w-40 mx-auto bg-gray-200 rounded-full" />
      </td>
    </tr>
  );
}

interface Booking {
  _id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  year: number;
  make: string;
  model: string;
  vehicleLocation: string;
  date: string;
  status: string;
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type BookingQueryData = {
  items: Booking[];
  pagination: Pagination;
};

type PageItem = number | "ellipsis";

type PaginationLike = Partial<{
  page: number;
  currentPage: number;
  current_page: number;
  pageNumber: number;
  limit: number;
  perPage: number;
  pageSize: number;
  per_page: number;
  total: number;
  totalItems: number;
  count: number;
  totalCount: number;
  totalPages: number;
  pages: number;
  total_pages: number;
}>;

export default function MyJobsTable() {
  const { data: session, status: sessionStatus } = useSession();
  const token = session?.accessToken;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const normalizePagination = (
    raw: PaginationLike | null | undefined,
    fallbackCount: number,
    fallbackPage: number,
    fallbackLimit: number,
  ): Pagination => {
    const resolvedLimit = Number(
      raw?.limit ??
        raw?.perPage ??
        raw?.pageSize ??
        raw?.per_page ??
        fallbackLimit,
    );
    const resolvedPage = Number(
      raw?.page ??
        raw?.currentPage ??
        raw?.current_page ??
        raw?.pageNumber ??
        fallbackPage,
    );
    const resolvedTotal = Number(
      raw?.total ?? raw?.totalItems ?? raw?.count ?? raw?.totalCount ?? fallbackCount,
    );
    const resolvedTotalPages = Number(
      raw?.totalPages ??
        raw?.pages ??
        raw?.total_pages ??
        (resolvedLimit ? Math.ceil(resolvedTotal / resolvedLimit) : 1),
    );

    return {
      page: Number.isFinite(resolvedPage) ? resolvedPage : fallbackPage,
      limit: Number.isFinite(resolvedLimit) ? resolvedLimit : fallbackLimit,
      total: Number.isFinite(resolvedTotal) ? resolvedTotal : fallbackCount,
      totalPages: Number.isFinite(resolvedTotalPages)
        ? resolvedTotalPages
        : 1,
    };
  };

  const fetchBookings = async (): Promise<BookingQueryData> => {
    if (!token) {
      throw new Error("No authentication token found");
    }

    const query = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    }).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking-inspect?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const json = await res.json();
    if (!json?.status) {
      throw new Error(json?.message || "Invalid response");
    }

    const rawData = json?.data;
    const rawPagination = json?.pagination ?? rawData?.pagination;
    let items: Booking[] = [];

    if (Array.isArray(rawData?.bookings)) {
      items = rawData.bookings;
    } else if (Array.isArray(rawData)) {
      items = rawData;
    } else if (Array.isArray(rawData?.items)) {
      items = rawData.items;
    } else if (Array.isArray(rawData?.data)) {
      items = rawData.data;
    }

    const pagination = normalizePagination(rawPagination, items.length, page, pageSize);

    return { items, pagination };
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["bookings", page, pageSize, token],
    queryFn: fetchBookings,
    enabled: sessionStatus === "authenticated" && !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const bookings = useMemo(() => data?.items ?? [], [data?.items]);
  const pagination = data?.pagination ?? {
    page: 1,
    limit: pageSize,
    total: bookings.length,
    totalPages: 1,
  };

  // Optional: client-side filter by status or name (you can enhance this)
  const filteredBookings = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return bookings;

    return bookings.filter((booking) =>
      booking.status.toLowerCase().includes(normalized) ||
      `${booking.customer.firstName} ${booking.customer.lastName}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [bookings, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getStatusStyle = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "completed" || lower === "assigned") {
      return "bg-[#B0D0B0] text-[#2f5a2f]";
    }
    return "bg-[#f4bf1a] text-black"; // pending or others
  };

  const getPageItems = (current: number, totalPages: number): PageItem[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (current >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", totalPages];
  };

  const pageItems = getPageItems(pagination.page, pagination.totalPages);
  const hasResults = filteredBookings.length > 0;

  const isPageNumber = (item: PageItem): item is number => typeof item === "number";

  const showingStart = searchTerm
    ? hasResults
      ? 1
      : 0
    : Math.min(
        (pagination.page - 1) * pagination.limit + 1,
        pagination.total,
      );
  const showingEnd = searchTerm
    ? filteredBookings.length
    : Math.min(
        (pagination.page - 1) * pagination.limit + filteredBookings.length,
        pagination.total,
      );
  const showingTotal = searchTerm ? filteredBookings.length : pagination.total;

  return (
    <section className="w-full bg-[#FEFBF5] px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto container space-y-4">
        {/* Top Bar */}
        <div className="rounded-[10px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
          <CardContent className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[24px] font-semibold text-[#131313]">My Jobs</h2>

            <div className="flex w-full max-w-full items-stretch overflow-hidden rounded-[8px] border border-[#bdbdbd] bg-white sm:max-w-[360px]">
              <Input
                placeholder="Search by Status or Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-[42px] border-0 bg-transparent text-[16px] text-[#222] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="h-[42px] rounded-none rounded-r-[8px] bg-[#f4bf1a] px-4 text-black hover:bg-[#e5b013]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </div>

        {/* Desktop Table */}
        <div className="hidden rounded-[10px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)] md:block">
          <CardContent className="p-4">
            <div className="overflow-hidden rounded-[8px] border border-[#B6B6B6]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#B6B6B6] bg-white">
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">Customer Name</th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">Vehicle</th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">Location</th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">Scheduled</th>
                      <th className="px-6 py-4 text-left text-[16px] font-medium text-[#131313]">Status</th>
                      <th className="px-6 py-4 text-center text-[16px] font-medium text-[#131313]">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoading || isFetching ? (
                      Array.from({ length: 5 }).map((_, i) => <JobSkeleton key={i} />)
                    ) : error ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-red-600">
                          Failed to load jobs. Please try again.
                        </td>
                      </tr>
                    ) : filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-[#666666]">
                          No jobs found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((job) => (
                        <tr key={job._id} className="border-b border-[#B6B6B6]">
                          <td className="px-6 py-6 text-[16px] text-[#131313]">
                            {job.customer.firstName} {job.customer.lastName}
                          </td>
                          <td className="px-6 py-6 text-[16px] text-[#131313]">
                            {job.year} {job.make} {job.model}
                          </td>
                          <td className="px-6 py-6 text-[16px] leading-[1.35] text-[#4d4d4d]">
                            <span className="inline-block max-w-[180px]">{job.vehicleLocation}</span>
                          </td>
                          <td className="px-6 py-6 text-[16px] text-[#4d4d4d]">
                            {formatDate(job.date)}
                          </td>
                          <td className="px-6 py-6">
                            <span
                              className={`inline-flex rounded-full px-3 py-[3px] text-[11px] font-medium ${getStatusStyle(
                                job.status
                              )}`}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-center">
                            <Link href={`/profile-details/${job._id}`}>
                              <Button className="h-[28px] rounded-full bg-[#0a8f14] px-4 text-[11px] font-medium text-white hover:bg-[#087710]">
                                <Eye className="mr-1.5 h-3.5 w-3.5" />
                                View Job Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - You can make this dynamic later */}
              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-[#666666]">
                  Showing {showingStart} to {showingEnd} of {showingTotal} results
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682] disabled:opacity-50"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageItems.map((item, idx) =>
                    isPageNumber(item) ? (
                      <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={`flex h-8 min-w-8 items-center justify-center rounded-[4px] px-2 text-[12px] font-medium ${
                          item === pagination.page
                            ? "bg-[#f4bf1a] text-white"
                            : "border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682]"
                        }`}
                      >
                        {item}
                      </button>
                    ) : (
                      <span
                        key={`ellipsis-${idx}`}
                        className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]"
                      >
                        ...
                      </span>
                    ),
                  )}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#7f8aa0] bg-white text-[#4b5563] disabled:opacity-50"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                    }
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {isLoading || isFetching ? (
            Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} isMobile />)
          ) : error ? (
            <Card className="p-8 text-center text-red-600">
              Failed to load jobs. Please try again.
            </Card>
          ) : filteredBookings.length === 0 ? (
            <Card className="p-8 text-center text-[#666666]">
              No jobs found.
            </Card>
          ) : (
            filteredBookings.map((job) => (
              <Card
                key={job._id}
                className="rounded-[10px] border border-[#ece7dd] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
              >
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] text-[#777777]">Customer Name</p>
                      <h3 className="text-[14px] font-semibold text-[#131313]">
                        {job.customer.firstName} {job.customer.lastName}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-[3px] text-[11px] font-medium ${getStatusStyle(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[12px] text-[#777777]">Vehicle</p>
                      <p className="text-[16px] text-[#131313]">
                        {job.year} {job.make} {job.model}
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] text-[#777777]">Scheduled</p>
                      <p className="text-[16px] text-[#131313]">
                        {formatDate(job.date)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[12px] text-[#777777]">Location</p>
                    <p className="text-[16px] leading-[1.4] text-[#4d4d4d]">
                      {job.vehicleLocation}
                    </p>
                  </div>

                  <Link href={`/profile-details/${job._id}`}>
                    <Button className="h-[38px] w-full rounded-full bg-[#008000] text-[12px] font-medium text-white hover:bg-[#087710]">
                      <Eye className="mr-2 h-4 w-4" />
                      View Job Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}

          {/* Mobile Pagination */}
          {!isLoading && !error && filteredBookings.length > 0 && (
            <Card className="rounded-[10px] border border-[#ece7dd] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
              <CardContent className="flex flex-col gap-4 p-4">
                <p className="text-[12px] text-[#666666]">
                  Showing {showingStart} to {showingEnd} of {showingTotal} results
                </p>

                <div className="flex items-center justify-center gap-1.5">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682] disabled:opacity-50"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageItems.map((item, idx) =>
                    isPageNumber(item) ? (
                      <button
                        key={`page-mobile-${item}`}
                        onClick={() => setPage(item)}
                        className={`flex h-8 min-w-8 items-center justify-center rounded-[4px] px-2 text-[12px] font-medium ${
                          item === pagination.page
                            ? "bg-[#f4bf1a] text-white"
                            : "border border-[#bfc5cf] bg-[#eceef2] text-[#6d7682]"
                        }`}
                      >
                        {item}
                      </button>
                    ) : (
                      <span
                        key={`ellipsis-mobile-${idx}`}
                        className="flex h-8 min-w-8 items-center justify-center rounded-[4px] border border-[#bfc5cf] bg-[#eceef2] px-2 text-[12px] text-[#6d7682]"
                      >
                        ...
                      </span>
                    ),
                  )}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#7f8aa0] bg-white text-[#4b5563] disabled:opacity-50"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                    }
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
