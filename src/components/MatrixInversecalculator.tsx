"use client"

import { useMemo, useState } from 'react'
import { makeGrid } from './GridUtils';
import { invertMatrix, Matrix } from '../lib/Matrix';
import { MatrixResult } from './MatrixResult';
import { MatrixInputGrid } from './MatrixInputGrid';

export default function MatrixInversecalculator() {
  const [n, setN] = useState<number>(3);
  const [cells, setCells] = useState<string[][]>(makeGrid(3, "0"));
  const [result, setResult] = useState<null | ReturnType<typeof invertMatrix>>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTrace, setShowTrace] = useState(false);

  function changeSize(next: number) {
    setN(next);
    setCells(makeGrid(next, "0"));
    setResult(null);
    setError(null)
    setShowTrace(false);
  }

  function setCell(i: number, j: number, value: string) {
    setCells((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[i][j] = value;
      return copy;
    })
  }

  function randomize() {
    setCells(
      Array.from({ length: n }, () =>
        Array.from({ length: n }, () => String(Math.floor(Math.random() * 17) - 8))
      )
    );
    setResult(null);
    setError(null);
    setShowTrace(false);
  }

  function clearAll() {
    setCells(makeGrid(n, "0"));
    setResult(null);
    setError(null);
    setShowTrace(false);
  }
 
  function compute() {
    const parsed: Matrix = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        const raw = cells[i][j].trim();
        const val = raw === "" ? 0 : Number(raw);
        if (Number.isNaN(val)) {
          setError(`Row ${i + 1}, column ${j + 1} isn't a valid number.`);
          setResult(null);
          return;
        }
        row.push(val);
      }
      parsed.push(row);
    }
    setError(null);
    setShowTrace(false);
    setResult(invertMatrix(parsed));
  }
 
  const canCompute = useMemo(() => cells.every((row) => row.every((c) => c.trim() !== "")), [cells]);
  return (
    <div className="w-full">
      <span
        className="inline-block text-xs font-bold tracking-wide px-3 py-1 rounded-full mb-4 bg-[#dbe9f7] text-[#1f5a8f]"
      >
        TRY IT YOURSELF
      </span>
      <h2 className="mb-6 flex items-center gap-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#3d2a4a]">
        Solve your own matrix inverse <span aria-hidden></span>
      </h2>
 
      <MatrixInputGrid
        n={n}
        cells={cells}
        canCompute={canCompute}
        error={error}
        onChangeSize={changeSize}
        onSetCell={setCell}
        onRandomize={randomize}
        onClear={clearAll}
        onCompute={compute}
      />
 
      {result && (
        <MatrixResult
          n={n}
          result={result}
          showTrace={showTrace}
          onToggleTrace={() => setShowTrace((v) => !v)}
        />
      )}
    </div>
  )
}
