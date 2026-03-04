import { Button } from "./ui/button";
import { Maximize2, Bed, Bath, Car, LandPlot, Utensils, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

function ModelCard({
  modelName,
  description,
  bedrooms,
  bathrooms,
  carports,
  livingAndDining,
  kitchen,
  photoUrl,
}: {
  modelName: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  carports: number;
  livingAndDining: number;
  kitchen: number;
  photoUrl?: string | null;
}) {
  const specs = [
    { icon: Bed,      value: bedrooms,       label: "Bedrooms"        },
    { icon: Bath,     value: bathrooms,       label: "Bathrooms"       },
    { icon: Car,      value: carports,        label: "Carports"        },
    { icon: LandPlot, value: livingAndDining, label: "Living & Dining" },
    { icon: Utensils, value: kitchen,         label: "Kitchen"         },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">

      {/* TOP: Image + Model Name side by side */}
      <div className="flex flex-col sm:flex-row">

        {/* Image */}
        <div className="w-full md:w-1/2 lg:w-1/3 shrink-0 aspect-video bg-neutral-200">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={modelName}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="size-8 text-neutral-400" />
            </div>
          )}
        </div>

        {/* Name + Description */}
        <div className="flex flex-col justify-center gap-2 p-5 border-b border-border w-full">
          <h2 className="text-2xl font-bold text-neutral-800">{modelName}</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* BOTTOM: Specs + CTA */}
      <div className="flex flex-col sm:flex-row items-stretch">

        {/* Specs */}
        <div className="flex flex-wrap divide-x divide-border border-b sm:border-b-0 border-border flex-1">
          {specs.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 px-4 py-4 flex-1 min-w-[80px]"
            >
              <Icon className="size-5 text-neutral-400" />
              <span className="text-sm font-semibold text-neutral-700">{value}</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center p-4 sm:border-l border-border shrink-0">
          <Button
            variant="ghost"
            size="lg"
            className="text-primary gap-2 whitespace-nowrap"
          >
            View More Details <Maximize2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModelCard;