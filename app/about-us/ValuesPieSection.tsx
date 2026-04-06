import React, { useState, useCallback } from "react";
import { Users, Trophy, Star, ShieldCheck, HeartHandshake } from "lucide-react";

const companyValues = [
  {
    icon: <Users className="size-10" strokeWidth={1.5} />,
    title: "Teamwork",
    description: "Exponential power of minds working together",
  },
  {
    icon: <Trophy className="size-10" strokeWidth={1.5} />,
    title: "Competence",
    description: "Striving for excellence in business and life",
  },
  {
    icon: <Star className="size-10" strokeWidth={1.5} />,
    title: "Confidence",
    description: "Empowering our people for bold innovation",
  },
  {
    icon: <ShieldCheck className="size-10" strokeWidth={1.5} />,
    title: "Integrity",
    description: "Transparency at the core of everything we do.",
  },
  {
    icon: <HeartHandshake className="size-10" strokeWidth={1.5} />,
    title: "Commitment",
    description: "Dedicated to value that exceeds expectations.",
  },
];

const SLICE_COUNT = companyValues.length;
const SLICE_DEG = 360 / SLICE_COUNT;

function wedgePath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startDeg));
  const y1 = cy + r * Math.sin(rad(startDeg));
  const x2 = cx + r * Math.cos(rad(endDeg));
  const y2 = cy + r * Math.sin(rad(endDeg));
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

const SLICE_FILLS = [
  "rgba(34, 64, 123)",
  "rgba(34, 64, 123)",
  "rgba(34, 64, 123)",
  "rgba(34, 64, 123)",
  "rgba(34, 64, 123)",
];

function ValuesPieSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cx = 100;
  const cy = 100;
  const outerR = 88;
  const iconR = 58;

  const handlePointer = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const active = companyValues[activeIndex];

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative mx-auto w-full max-w-[min(420px,92vw)] aspect-square select-none">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-md"
          role="img"
          aria-label="Five company values as pie slices"
        >
          {companyValues.map((slice, i) => {
            const start = -90 + i * SLICE_DEG;
            const end = -90 + (i + 1) * SLICE_DEG;
            const isActive = activeIndex === i;
            return (
              <path
                key={slice.title}
                d={wedgePath(cx, cy, outerR, start, end)}
                fill={SLICE_FILLS[i]}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-[filter,opacity] duration-200 hover:brightness-110"
                style={{
                  opacity: isActive ? 1 : 0.88,
                  filter: isActive ? "brightness(1.06)" : undefined,
                }}
                onMouseEnter={() => handlePointer(i)}
                onFocus={() => handlePointer(i)}
                onClick={() => handlePointer(i)}
                tabIndex={0}
              />
            );
          })}
          <circle
            cx={cx}
            cy={cy}
            r={34}
            fill="white"
            stroke="rgb(226 232 240)"
            strokeWidth="1.5"
            className="pointer-events-none"
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            className="fill-primary text-[9px] font-bold uppercase tracking-wide"
            style={{ fontSize: "9px" }}
          >
            Our
          </text>
          <text
            x={cx}
            y={cy + 9}
            textAnchor="middle"
            className="fill-primary text-[9px] font-bold uppercase tracking-wide"
            style={{ fontSize: "9px" }}
          >
            Values
          </text>
          {companyValues.map((value, i) => {
            const mid = -90 + i * SLICE_DEG + SLICE_DEG / 2;
            const rad = (mid * Math.PI) / 180;
            const ox = cx + iconR * Math.cos(rad) - 14;
            const oy = cy + iconR * Math.sin(rad) - 14;
            return (
              <foreignObject
                key={`icon-${value.title}`}
                x={ox}
                y={oy}
                width="28"
                height="28"
                className="pointer-events-none overflow-visible"
              >
                <div className="flex h-7 w-7 items-center justify-center text-white">
                  {React.cloneElement(
                    value.icon as React.ReactElement<
                      { size: number } & React.SVGProps<SVGSVGElement>
                    >,
                    { size: 16, strokeWidth: 1.75 },
                  )}
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      <div className="w-full max-w-lg px-2 text-center">
        <h3 className="text-xl font-bold text-primary md:text-2xl">
          {active.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {active.description}
        </p>
      </div>
    </div>
  );
}

export default ValuesPieSection;
