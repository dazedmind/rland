import { Briefcase, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
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

/** Get display label for department (DB has "it", we show "Information Technology") */
function getDepartmentLabel(deptKey: string): string {
  return (department as Record<string, string>)[deptKey] ?? deptKey;
}

const PER_PAGE = 6;

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
  const [response, setResponse] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const isPaginated = onPageChange != null;
  const effectiveLimit = limit ?? PER_PAGE;
  const effectivePage = isPaginated ? page : 1;

  const fetchCareerListing = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(effectiveLimit),
        page: String(effectivePage),
      });
      if (selectedDepartment) params.set("department", selectedDepartment);
      if (selectedLocation) params.set("location", selectedLocation);
      if (excludeId != null) params.set("excludeId", String(excludeId));
      const res = await fetch(`/api/careers?${params}`);
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setResponse({
          data: json.data,
          total: json.total ?? 0,
          page: json.page ?? 1,
          limit: json.limit ?? effectiveLimit,
          totalPages: json.totalPages ?? 1,
        });
      } else {
        setResponse({ data: [], total: 0, page: 1, limit: effectiveLimit, totalPages: 1 });
      }
    } catch (error) {
      console.error("[GET /api/careers]", error);
      setResponse({ data: [], total: 0, page: 1, limit: effectiveLimit, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  const truncateDescription = (description: string) => {
    return description.length > 200 ? description.slice(0, 200) + "..." : description;
  }

  useEffect(() => {
    fetchCareerListing();
  }, [effectivePage, selectedDepartment, selectedLocation, excludeId, effectiveLimit]);

  if (loading) {
    return <CareerListSkeleton count={effectiveLimit} />;
  }

  const { data: careers, totalPages, total } = response ?? { data: [], totalPages: 1, total: 0 };

  return (
    <>
      {careers.length > 0 ? (
        <>
          {careers.map((career: Career) => (
            <div key={career.id} className="flex flex-col gap-2 border-border border rounded-lg p-4 w-full">
              <h3 className="text-xl font-bold">{career.position}</h3>
              <p className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4" /> {getDepartmentLabel(career.department)}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> {career.location}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" /> Posted: {dateFormatter(career.createdAt)}
              </p>
              <p className="text-sm text-neutral-500">
                {truncateDescription(career.jobDescription)}
              </p>
              <Link href={`/careers/${urlNameToSlug(career.position)}`}>
                <Button size="sm" variant="primary" className="w-full lg:w-fit text-white">
                  Apply Now
                </Button>
              </Link>
            </div>
          ))}
          {isPaginated && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
              <p className="text-sm text-neutral-500">
                Showing page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPageChange?.(page - 1)}
                  className={`gap-1 ${page <= 1 ? "hidden" : ""}`}
                >
                  <ChevronLeft className="size-4" />
                </Button>

                {/* PAGES BUTTONS */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber: number) => (
                  <span key={pageNumber} className={`cursor-pointer p-1 px-3 border-border border rounded-md ${pageNumber === page ? "font-bold bg-primary text-white" : ""}`} onClick={() => onPageChange?.(pageNumber)}>{pageNumber}</span>
                ))}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPageChange?.(page + 1)}
                  disabled={page >= totalPages}
                  className="gap-1"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-neutral-500 py-8 text-center">
          {total === 0 ? "No listing available at the moment" : "No jobs match the selected filters. Try different options."}
        </div>
      )}
    </>
  );
}

export default CareerCard;
