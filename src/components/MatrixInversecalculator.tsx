'use client'

import React, { useMemo, useState } from 'react'
import { invertMatrix, type Matrix } from '../lib/Matrix';
import BracketEdge from './BracketEdge';

const SIZES = [2, 3, 4, 5, 6];
const INK = "#3d2a4a";
const MUTED = "#7a6a83";
const PINK = "#d6497a";
const PURPLE = "#6b3fa0";
const BRACKET = "#a68fd9";
const RED = "#c0392b";
const DARK_PILL = "#2f2140";
const CELL_BG = "#fdf1e4";
const CELL_BORDER = "#f0d9b5";
const TRACE_BG = "#f8f5fb";
const TRACE_BORDER = "#e5dcf0";

function makeGrid(n: number, fill: string): string[][]{
  return Array.from({
    length: n
  }, () => Array.from({ length: n }, () => fill));
}

function identityGrid(n: number): string[][]{
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? "1" : "0")));
}

function fmt(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  const s = Object.is(r, -0) ? "0" : r.toString();
  return s;
}

export default function MatrixInversecalculator() {
  const [n, setN] = useState(3);
  const [cells, setCells] = useState<string[][]>(identityGrid(3));
  const [result, setResult] = useState<null | ReturnType<typeof invertMatrix>>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTrace, setShowTrace] = useState<boolean>(false);

  function changeSize(next: number) {
    setN(next);
    setCells(identityGrid(next));
    setResult(null);
    setError(null);
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
      Array.from({length: n}, ()=> Array.from({length: n}, ()=> String(Math.floor(Math.random() * 17) - 8)))
    )
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
    for (let i = 0; i < n; i++){
      const row: number[] = [];
      for (let j = 0; j < n; j++){
        const raw = cells[i][j].trim();
        const val = raw === "" ? 0 : Number(raw);
        if (Number.isNaN(val)) {
          setError(`Row ${i + 1}, column ${j + 1} isn't a valid number.`);
          setResult(null);
          return
        }
        row.push(val);
      }
      parsed.push(row);
    }
    setError(null)
    setShowTrace(false)
    setResult(invertMatrix(parsed));
  }
  const canCompute = useMemo(() => cells.every((row) => row.every((c) => c.trim() !== "")), [cells]);
  return (
    <div className="w-full">
      <span
        className="inline-block text-xs font-bold tracking-wide px-3 py-1 rounded-full mb-4"
        style={{ background: "#fbdce6", color: "#c9457a" }}
      >
        TRY IT YOURSELF
      </span>
      <h2
        className="font-bold mb-6 flex items-center gap-2"
        style={{ color: INK, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
      >
        Solve your own matrix inverse <span aria-hidden></span>
      </h2>
 
      <div
        className="rounded-3xl bg-white p-6 sm:p-8"
        style={{ boxShadow: "0 8px 30px rgba(61,42,74,0.10)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => changeSize(s)}
                className="font-semibold text-sm px-4 py-2 rounded-full transition-colors"
                style={{
                  background: s === n ? PINK : "#ffffff",
                  color: s === n ? "#ffffff" : MUTED,
                  border: s === n ? "none" : "1px solid #e8dde8",
                }}
              >
                matrix {s}×{s}
              </button>
            ))}
          </div>
 
          <div className="flex items-center gap-4">
            <button
              onClick={randomize}
              className="font-semibold text-sm px-4 py-2.5 rounded-full text-white flex items-center gap-2"
              style={{ background: DARK_PILL }}
            >
              <span aria-hidden></span> randomize
            </button>
            <button
              onClick={clearAll}
              className="font-mono text-xs underline decoration-dotted"
              style={{ color: MUTED }}
            >
              clear
            </button>
          </div>
        </div>
 
        <div className="flex items-stretch justify-center gap-0 overflow-x-auto py-2">
          <BracketEdge side="left" />
          <div
            className="grid gap-3 p-4"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(56px, 64px))` }}
          >
            {cells.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`${i}-${j}`}
                  value={val}
                  onChange={(e) => setCell(i, j, e.target.value)}
                  onFocus={(e) => e.target.select()}
                  inputMode="decimal"
                  aria-label={`a${i + 1}${j + 1}`}
                  className="font-mono text-center text-base font-semibold outline-none transition-shadow"
                  style={{
                    background: CELL_BG,
                    color: INK,
                    border: `2px solid ${CELL_BORDER}`,
                    borderRadius: 12,
                    height: 48,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e0bd85")}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderColor = CELL_BORDER;
                    }
                  }}
                  onBlur={(e) => (e.currentTarget.style.borderColor = CELL_BORDER)}
                  onFocusCapture={(e) => (e.currentTarget.style.borderColor = PINK)}
                />
              ))
            )}
          </div>
          <BracketEdge side="right" />
        </div>
 
        <div className="flex flex-col items-center mt-8">
          <button
            onClick={compute}
            disabled={!canCompute}
            className="font-semibold text-base px-8 py-3.5 rounded-full text-white transition-opacity disabled:opacity-40 flex items-center gap-2"
            style={{ background: DARK_PILL }}
          >
            <span aria-hidden>✨</span> compute inverse
          </button>
          {!canCompute && (
            <span className="font-mono text-xs mt-3" style={{ color: MUTED }}>
              fill in every cell first
            </span>
          )}
          {error && (
            <p className="font-mono text-sm mt-3" style={{ color: RED }}>
              {error}
            </p>
          )}
        </div>
      </div>
 
      {/* Result card */}
      {result && (
        <div
          className="rounded-3xl bg-white p-6 sm:p-8 mt-6"
          style={{ boxShadow: "0 8px 30px rgba(61,42,74,0.10)" }}
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-6">
            <span className="font-mono text-xs" style={{ color: MUTED }}>det(A) =</span>
            <span
              className="font-mono text-xl font-semibold"
              style={{ color: result.singular ? RED : PURPLE }}
            >
              {fmt(result.determinant)}
            </span>
          </div>
 
          {result.singular || !result.inverse ? (
            <div>
              <p className="font-bold text-xl mb-2" style={{ color: RED }}>
                This matrix has no inverse.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                The determinant is zero (within numerical tolerance), so the matrix is
                singular. Gauss-Jordan elimination could not produce a full pivot in
                every column — at least one row became entirely zero during reduction.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-stretch justify-center gap-0 overflow-x-auto mb-6">
                <BracketEdge side="left" tall />
                <div
                  className="grid gap-2 p-4"
                  style={{ gridTemplateColumns: `repeat(${n}, minmax(64px, 84px))` }}
                >
                  {result.inverse.map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="font-mono text-center text-base font-semibold flex items-center justify-center"
                        style={{
                          background: CELL_BG,
                          color: INK,
                          border: `2px solid ${CELL_BORDER}`,
                          borderRadius: 12,
                          height: 48,
                        }}
                      >
                        {fmt(val)}
                      </div>
                    ))
                  )}
                </div>
                <BracketEdge side="right" tall />
              </div>
 
              <div className="flex justify-center">
                <button
                  onClick={() => setShowTrace((v) => !v)}
                  className="font-mono text-xs underline decoration-dotted"
                  style={{ color: MUTED }}
                >
                  {showTrace ? "hide" : "show"} elimination trace ({result.steps.length} steps)
                </button>
              </div>
 
              {showTrace && (
                <div
                  className="rounded-2xl p-4 font-mono text-xs leading-relaxed overflow-x-auto mt-4"
                  style={{
                    background: TRACE_BG,
                    border: `1px solid ${TRACE_BORDER}`,
                    color: INK,
                    maxHeight: 340,
                    overflowY: "auto",
                  }}
                >
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="mb-3">
                      <div style={{ color: PURPLE }}>
                        [{String(idx).padStart(2, "0")}] {step.label}
                      </div>
                      <pre className="whitespace-pre" style={{ color: INK }}>
                        {step.augmented
                          .map((row) => row.map((v) => fmt(v).padStart(7, " ")).join(" "))
                          .join("\n")}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
