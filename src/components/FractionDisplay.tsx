"use client";

import { fmtFractionParts } from "./gridUtils";

export function FractionDisplay({ value, className = "" }: { value: number; className?: string }) {
  const parts = fmtFractionParts(value);

  if (parts.kind !== "fraction") {
    return <span className={className}>{parts.value}</span>;
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      {parts.sign && <span className="mr-0.5">{parts.sign}</span>}
      <span className="inline-flex flex-col items-center leading-none text-[0.85em]">
        <span className="border-b-2 border-current px-1 pb-0.5">{parts.numerator}</span>
        <span className="px-1 pt-0.5">{parts.denominator}</span>
      </span>
    </span>
  );
}