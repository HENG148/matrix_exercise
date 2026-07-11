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