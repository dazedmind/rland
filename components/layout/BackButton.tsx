import Link from "next/link";
import React from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";

function BackButton({
  href,
  mainPageName,
}: {
  href: string;
  mainPageName: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <Link
        href={href}
        className="flex items-center gap-2 border border-primary/20 bg-slate-100 hover:bg-primary hover:text-white rounded-full text-primary font-medium w-fit transition-all duration-300 ease-in-out p-1"
      >
        <ChevronLeft className="size-6" />
      </Link>
      <p className="text-base font-medium text-primary">Back to {mainPageName}</p>
    </span>
  );
}

export default BackButton;
