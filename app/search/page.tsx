"use client";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import HouseSearchCard, { type SearchModelItem } from "@/components/cards/HouseSearchCard";
import Link from "next/link";
import HouseSearchBar from "@/components/cards/HouseSearchBar";
import SearchResultsSkeleton from "@/components/layout/skeleton/SearchResultsSkeleton";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
};

const PER_PAGE = 5;

// Separate component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const location = searchParams.get("location");
  const priceRange = searchParams.get("priceRange");
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

  const [items, setItems] = useState<SearchModelItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const priceRangeFormattedArray = priceRange
    ?.split(",")
    .map((amount: string) => parseInt(amount, 10));

  const totalPages = Math.ceil(total / PER_PAGE);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  useEffect(() => {
    if (!location?.trim()) {
      setLoading(false);
      setItems([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ location, limit: String(PER_PAGE), page: String(page) });
    if (priceRange) params.set("priceRange", priceRange);

    fetch(`/api/search?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch search results");
        return res.json();
      })
      .then((data) => {
        setItems(Array.isArray(data?.items) ? data.items : []);
        setTotal(data?.total ?? 0);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("Failed to load search results");
        setItems([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [location, priceRange, page]);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/search?${params.toString()}`);
  };

  if (!location?.trim()) {
    return (
      <section className="flex flex-col items-start px-8 md:px-16 xl:px-64 justify-center py-16 space-y-8">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
        <p className="text-muted-foreground">
          Select a location and price range above to search for available units.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start px-8 md:px-16 xl:px-64 justify-center py-16 space-y-8">
      <span>
        <Link href="/" className="flex items-center gap-2 text-primary">
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
            Price Range: {formatCurrency(priceRangeFormattedArray?.[0] ?? 0)} -{" "}
            {formatCurrency(priceRangeFormattedArray?.[1] ?? 0)}
            {total > 0 && (
              <span className="ml-2">
                • {total} {total === 1 ? "model" : "models"} found
              </span>
            )}
          </p>
        </span>

        {loading ? (
          <SearchResultsSkeleton />
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">
            No models found matching your criteria. Try adjusting the location
            or price range.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <HouseSearchCard
                  key={`${item.project.id}-${item.modelName}`}
                  modelCard={item}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={!hasPrev}
                  className="px-4 py-2 rounded-lg border border-border bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasNext}
                  className="px-4 py-2 rounded-lg border border-border bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </span>
    </section>
  );
}

function SearchBarWithParams() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "";
  const priceRangeParam = searchParams.get("priceRange");
  const parsed = priceRangeParam?.split(",").map((s) => parseInt(s.trim(), 10));
  const initialPriceRange =
    parsed?.length === 2 && !parsed.some(isNaN)
      ? (parsed as [number, number])
      : undefined;

  return (
    <HouseSearchBar
      className="w-full lg:w-1/2 my-12 shadow-lg"
      initialLocation={location}
      initialPriceRange={initialPriceRange}
    />
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

      <div className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center h-auto bg-linear-to-br from-primary to-slate-900">
        <span className="flex justify-center items-center gap-2 text-white w-full">
          <Suspense fallback={<div className="h-24 w-full lg:w-1/2 animate-pulse rounded-lg bg-neutral-200" />}>
            <SearchBarWithParams />
          </Suspense>
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
