export type Matrix = number[][];

export interface EliminationStep{
  label: string;
  augmented: Matrix;
}

export interface InverseResult{
  inverse: Matrix | null;
  determinant: number;
  singular: boolean;
  steps: EliminationStep[];
}

function cloneMatrix(m: Matrix): Matrix{
  return m.map((row) => [...row]);
}

function formatNum(x: number): string{
  const r = Math.round(x * 1e6) / 1e6;
  return Object.is(r, -0) ? "0" : r.toString();
}

export function invertMatrix(A: Matrix): InverseResult {
  const n = A.length;
  const steps: EliminationStep[] = [];
  let aug: Matrix = A.map((row, i) => [
    ...row,
    ...Array.from({length: n}, (_, j) => (i === j ? 1 : 0)),
  ])
  steps.push({ label: "Start: augment A with the identity matrix [A | I]", augmented: cloneMatrix(aug) });

  const maxAbs = Math.max(1e-12, ...A.flat().map((v) => Math.abs(v)));
  const eps = Math.max(1e-9, maxAbs * 1e-10);

  let sign = 1;
  let pivotProduct = 1;

  for (let col = 0; col < n; col++) {
    let pivotRow = col;
    for (let r = col + 1; r < n; r++){
      if (Math.abs(aug[r][col]) > Math.abs(aug[pivotRow][col])) {
        pivotRow = r;
      }
    }
    if (Math.abs(aug[pivotRow][col]) < eps) {
      return {
        inverse: null,
        determinant: 0,
        singular: true, steps
      };
    }
    if (pivotRow !== col) {
      [aug[col], aug[pivotRow]] = [aug[pivotRow], aug[col]];
      sign *= -1;
      steps.push({
        label: `Swap R${col + 1} <-> R${pivotRow + 1} (partial pivoting)`,
        augmented: cloneMatrix(aug),
      })
    }

    const pivotVal = aug[col][col];
    pivotProduct *= pivotVal;

    if (Math.abs(pivotVal - 1) > 1e-12) {
      aug[col] = aug[col].map((v) => v / pivotVal);
      steps.push({
        label: `R${col + 1} -> R${col + 1} / ${formatNum(pivotVal)}`,
        augmented: cloneMatrix(aug),
      })
    }

    for (let r = 0; r < n; r++){
      if (r === col) continue;
      const factor = aug[r][col];
      if (Math.abs(factor) > 1e-14) {
        aug[r] = aug[r].map((v, k) => v - factor * aug[col][k]);
        steps.push({
          label: `R${r + 1} -> R${r + 1} - (${formatNum(factor)}).R${col + 1}`,
          augmented: cloneMatrix(aug),
        })
      }
    }
  }

  const determinant = sign * pivotProduct;
  const inverse = aug.map((row) => row.slice(n, 2 * n));
  return { inverse, determinant, singular: false, steps };
}

export function emptyMatrix(n: number): Matrix{
  return Array.from({
    length: n
  }, () => Array.from({ length: n }, () => 0));
}