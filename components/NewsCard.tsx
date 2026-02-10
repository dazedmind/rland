import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import { ArrowUpRight } from "lucide-react";

function NewsCard() {
  return (
    <div className="rounded-xl relative">
      
      <div className="flex flex-col justify-end gap-2 p-4 absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/80 to-black/10 rounded-md">

        <p className="text-sm text-neutral-300">26 November 2025</p>
        <h2 className="text-md font-bold text-white line-clamp-2">
          R LAND DEVELOPMENT INC. JOINS PAG-IBIG HOUSING FAIR EXPO 2025
        </h2>

        <button className="flex items-center justify-center bg-secondary rounded-full absolute top-4 right-4 w-10 h-10 cursor-pointer">
          <ArrowUpRight className="w-8 h-8 text-white" strokeWidth={2} />
        </button>
      </div>
      <Image
        src={aeMeadowUnit}
        alt="News 1"
        width={300}
        height={100}
        className="rounded-lg aspect-square object-cover"
      />
    </div>
  );
}

export default NewsCard;
