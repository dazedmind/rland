import React from "react";

interface DetailBadgeProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

export function DetailBadge({ icon: Icon, label, value }: DetailBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white backdrop-blur-md">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col leading-tight text-white">
        <span className="text-sm font-bold">{value}</span>
        <span className="text-[10px] uppercase tracking-wider opacity-80">
          {label}
        </span>
      </div>
    </div>
  );
}
