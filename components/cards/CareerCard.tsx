import { Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dateFormatter } from "@/app/utils/dateFormatter";
import CareerListSkeleton from "../layout/skeleton/CareerListSkeleton";

type Career = {
  id: number;
  position: string;
  location: string;
  jobDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

function CareerCard({ limit }: { limit?: number }) {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCareerListing = async () => {
    try {
      const response = await fetch("/api/careers");
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      console.error("[GET /api/careers]", error);
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerListing();
  }, []);

  if (loading) {
    return <CareerListSkeleton count={limit ?? 4} />;
  }

  return (
    <>
      {careers.length > 0 ? (
        <>
          {careers.slice(0, limit).map((career: Career) => (
            <div key={career.id} className="flex flex-col gap-2 border-border border rounded-lg p-4 w-full">
              <h3 className="text-xl font-bold">{career.position}</h3>
              <p className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> {career.location}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" /> Posted: {dateFormatter(career.createdAt)}
              </p>
              <p className="text-sm text-neutral-500">
                {career.jobDescription}
              </p>

              <Link href={`/careers/${career.id}`}>
                <Button size="sm" variant="primary" className="w-full lg:w-fit text-white">
                  Apply Now
                </Button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div>No listing available at the moment</div>
      )}
    </>
  );
}

export default CareerCard;
