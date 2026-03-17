"use client";
import React from "react";
import { Briefcase, ChevronLeft, ChevronRight, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "@/app/utils/dateFormatter";
import CareerListSkeleton from "../layout/skeleton/CareerListSkeleton";
import { department } from "@/app/utils/types";
import { urlNameToSlug } from "@/lib/utils";

type Career = {
  id: number;
  position: string;
  department: string;
  location: string;
  jobDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type PaginatedResponse = {
  data: Career[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const PER_PAGE = 6;

function getDepartmentLabel(deptKey: string): string {
  return (department as Record<string, string>)[deptKey] ?? deptKey;
}

const truncateDescription = (description: string) =>
  description.length > 200 ? description.slice(0, 200) + "..." : description;

async function fetchCareers(params: URLSearchParams): Promise<PaginatedResponse> {
  const res = await fetch(`/api/careers?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch careers");
  const json = await res.json();
  return {
    data: Array.isArray(json.data) ? json.data : [],
    total: json.total ?? 0,
    page: json.page ?? 1,
    limit: json.limit ?? PER_PAGE,
    totalPages: json.totalPages ?? 1,
  };
}

function CareerCard({
  page = 1,
  onPageChange,
  selectedLocation,
  selectedDepartment,
  limit,
  excludeId,
}: {
  page?: number;
  onPageChange?: (page: number) => void;
  selectedLocation?: string;
  selectedDepartment?: string;
  limit?: number;
  excludeId?: number;
}) {
  const isPaginated = onPageChange != null;
  const effectiveLimit = limit ?? PER_PAGE;
  const effectivePage = isPaginated ? page : 1;

  const params = new URLSearchParams({
    limit: String(effectiveLimit),
    page: String(effectivePage),
  });
  if (selectedDepartment) params.set("department", selectedDepartment);
  if (selectedLocation) params.set("location", selectedLocation);
  if (excludeId != null) params.set("excludeId", String(excludeId));

  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["careers", effectivePage, selectedDepartment, selectedLocation, excludeId, effectiveLimit],
    queryFn: () => fetchCareers(params),
  });

  if (loading) {
    return <CareerListSkeleton count={effectiveLimit} />;
  }

  const { data: careers = [], totalPages = 1, total = 0 } = response ?? {};

  return (
    <div className="flex flex-col gap-4 w-full">
      {careers.length > 0 ? (
        <>
          {careers.map((career: Career) => (
            <div 
              key={career.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-neutral-200 rounded-xl bg-white transition-all duration-300 hover:border-primary/40 hover:bg-slate-50/30"
            >
              <div className="flex-1 space-y-3">
                {/* Department Badge */}
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary">
                  {getDepartmentLabel(career.department)}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
                  {career.position}
                </h3>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-slate-400" />
                    {career.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 text-slate-400" />
                    Posted {dateFormatter(career.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 max-w-2xl">
                  {truncateDescription(career.jobDescription)}
                </p>

                <div className="flex items-center">
                  <Link href={`/careers/${urlNameToSlug(career.position)}`} className="w-full md:w-auto">
                    <Button 
                      variant="primary"
                      size="sm"
                    >
                      Apply Now
                      {/* <ArrowUpRight className="ml-2 size-4" /> */}
                    </Button>
                  </Link>
                </div>
              </div>

       
            </div>
          ))}

          {/* Pagination */}
          {isPaginated && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-neutral-100">
              <p className="text-sm font-medium text-slate-400">
                Showing <span className="text-slate-900">{page}</span> of <span className="text-slate-900">{totalPages}</span> pages
              </p>
              
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange?.(page - 1)}
                  disabled={page <= 1}
                  className="rounded-lg border-neutral-200"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => onPageChange?.(num)}
                      className={`min-w-[40px] h-10 rounded-lg text-sm font-bold transition-all ${
                        num === page 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-transparent text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange?.(page + 1)}
                  disabled={page >= totalPages}
                  className="rounded-lg border-neutral-200"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-neutral-200 rounded-2xl bg-slate-50/50">
          <Briefcase className="size-10 text-neutral-300 mb-4" />
          <p className="text-slate-500 font-medium text-center">
            {total === 0 ? "No career openings at the moment." : "No jobs match your current filters. Try adjusting them."}
          </p>
        </div>
      )}
    </div>
  );
}

export default CareerCard;