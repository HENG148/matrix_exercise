export type MatrixExample = {
  m: [[number, number], [number, number]];
  inv: [[string, string], [string, string]];
  det: string;
};

export const EXAMPLES: MatrixExample[] = [
  {
    m: [[4, 2], [7, 6]],
    inv: [["0.6", "-0.2"], ["-0.7", "0.4"]],
    det: "10",
  },
  {
    m: [[3, 0], [5, 1]],
    inv: [["0.33", "0"], ["-1.67", "1"]],
    det: "3",
  },
  {
    m: [[2, -1], [1, 3]],
    inv: [["0.43", "0.14"], ["-0.14", "0.29"]],
    det: "7",
  }
]