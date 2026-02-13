"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileNavBar from "@/components/MobileNavBar";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import HouseSearchCard from "@/components/HouseSearchCard";
import Link from "next/link";
import HouseSearchBar from "@/components/HouseSearchBar";

// Separate component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const priceRange = searchParams.get("priceRange");

  const priceRangeFormattedArray = priceRange
    ?.split(",")
    .map((amount: string) => {
      return parseInt(amount);
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  return (
    <section className="flex flex-col items-start px-8 md:px-16 xl:px-64 justify-center py-16 space-y-8">
      <span>
        <Link href="/" className="flex items-center gap-2 text-primary">
          {" "}
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
      </span>
      <span className="flex flex-col gap-4 w-full">
        <span className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">
            Showing Residences in{" "}
            <span className="text-primary">{location}</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Price Range:{" "}
            {formatCurrency(priceRangeFormattedArray?.[0] || 0)} -{" "}
            {formatCurrency(priceRangeFormattedArray?.[1] || 0)}
          </p>
        </span>

        <div className="flex flex-col gap-4">
          <HouseSearchCard price={"2500000"} />
          <HouseSearchCard price={"2500000"} />
          <HouseSearchCard price={"2500000"} />
        </div>
      </span>
    </section>
  );
}

function SearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" mt-20 md:mt-30">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <div className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center h-auto bg-linear-to-r from-neutral-50 to-neutral-200">
        <span className="flex justify-center items-center gap-2 text-white w-full">
          <HouseSearchBar className="w-full lg:w-1/2 my-12 shadow-lg" />
        </span>
      </div>

      <main>
        <Suspense fallback={
          <div className="flex flex-col items-start px-8 md:px-16 xl:px-64 justify-center py-16 space-y-8">
            <p className="text-muted-foreground">Loading search results...</p>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SearchPage;
