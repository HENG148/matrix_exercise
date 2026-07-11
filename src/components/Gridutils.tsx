export function makeGrid(n: number, fill: string): string[][]{
  return Array.from({ length: n }, () => Array.from({ length: n }, () => fill));
}

export function identityGrid(n: number): string[][]{
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => i === j ? "1" : "0")
  )
}

export function fmt(x: number): string{
  const r = Math.round(x * 10000) / 10000;
  const s = Object.is(r, -0) ? "0" : r.toString();
  return s;
}

export function fmtFraction(
  x: number,
  tolerance = 1e-6,
  maxDenominator = 1_000_000
): string {
  if (!Number.isFinite(x)) return fmt(x);

  const cleaned = Math.round(x * 1e6) / 1e6;
  if (Object.is(cleaned, -0)) return "0";
  if (Number.isInteger(cleaned)) return cleaned.toString();
 
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
 
  if (denominator === 0 || denominator > maxDenominator) {
    return fmt(x);
  }
  if (denominator === 1) return (sign * numerator).toString();
  return `${sign * numerator}/${denominator}`;
}