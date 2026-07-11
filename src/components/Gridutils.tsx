export function makeGrid(n: number, fill: string): string[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => fill));
}

export function identityGrid(n: number): string[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? "1" : "0"))
  );
}

export function fmt(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  const s = Object.is(r, -0) ? "0" : r.toString();
  return s;
}

export type FractionParts =
  | { kind: "integer"; value: string }
  | { kind: "fraction"; sign: string; numerator: string; denominator: string }
  | { kind: "decimal"; value: string };

function computeFractionParts(
  x: number,
  tolerance = 1e-6,
  maxDenominator = 1_000_000
): FractionParts {
  if (!Number.isFinite(x)) return { kind: "decimal", value: fmt(x) };

  const cleaned = Math.round(x * 1e6) / 1e6;
  if (Object.is(cleaned, -0)) return { kind: "integer", value: "0" };
  if (Number.isInteger(cleaned)) return { kind: "integer", value: cleaned.toString() };

  const sign = cleaned < 0 ? -1 : 1;
  const target = Math.abs(cleaned);

  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = target;
  let numerator = h1, denominator = k1;

  for (let i = 0; i < 30; i++) {
    const a = Math.floor(b);
    const h = a * h1 + h2;
    const k = a * k1 + k2;
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
    numerator = h1;
    denominator = k1;

    if (Math.abs(target - numerator / denominator) < tolerance || denominator > maxDenominator) {
      break;
    }
    const frac = b - a;
    if (frac === 0) break;
    b = 1 / frac;
  }

  if (denominator === 0 || denominator > maxDenominator) return { kind: "decimal", value: fmt(x) };
  if (denominator === 1) return { kind: "integer", value: (sign * numerator).toString() };
  return {
    kind: "fraction",
    sign: sign === -1 ? "-" : "",
    numerator: numerator.toString(),
    denominator: denominator.toString(),
  };
}

export function fmtFractionParts(x: number): FractionParts {
  return computeFractionParts(x);
}

export function fmtFraction(x: number): string {
  const p = computeFractionParts(x);
  if (p.kind === "fraction") return `${p.sign}${p.numerator}/${p.denominator}`;
  return p.value;
}