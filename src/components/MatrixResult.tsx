import { invertMatrix } from "../lib/Matrix";
import BracketEdge from "./BracketEdge";
import { FractionDisplay } from "./FractionDisplay";
import { fmt } from "./GridUtils";

type Props = {
  n: number;
  result: ReturnType<typeof invertMatrix>
  showTrace: boolean;
  onToggleTrace: () => void;
}

export function MatrixResult({ n, result, showTrace, onToggleTrace }: Props) {
  return (
     <div
      className="rounded-3xl bg-white p-6 sm:p-8 mt-6"
      style={{ boxShadow: "0 8px 30px rgba(61,42,74,0.10)" }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-6">
        <span className="font-mono text-xs text-[#7a6a83]">det(A) =</span>
        <span
          className="font-mono text-xl font-semibold"
          style={{ color: result.singular ? "#c0392b" : "#6b3fa0" }}
        >
          {/* {fmt(result.determinant)} */}
          <FractionDisplay value={result.determinant} />
        </span>
      </div>
 
      {result.singular || !result.inverse ? (
        <div>
          <p className="font-bold text-xl mb-2 text-[#c0392b]">
            This matrix has no inverse.
          </p>
          <p className="text-sm leading-relaxed text-[#7a6a83]">
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
                    className="font-mono text-center text-base font-semibold flex items-center justify-center bg-[#eaf3fb] text-[#3d2a4a] border-2 border-[#c9def2] rounded-[12px] h-12 "
                  >
                    {/* {fmt(val)} */}
                    <FractionDisplay value={val} />
                  </div>
                ))
              )}
            </div>
            <BracketEdge side="right" tall />
          </div>
 
          <div className="flex justify-center">
            <button
              onClick={onToggleTrace}
              className="font-mono text-xs underline decoration-dotted text-[#7a6a83]"
            >
              {showTrace ? "hide" : "show"} elimination trace ({result.steps.length} steps)
            </button>
          </div>
 
          {showTrace && (
            <div
              className="rounded-2xl p-4 font-mono text-xs leading-relaxed overflow-x-auto max-h-[340] overflow-y-auto mt-4 text-[#3d2a4a] bg-[#f8f5fb] border border-[#e5dcf0]"
            >
              {result.steps.map((step, idx) => (
                <div key={idx} className="mb-3">
                  <div className="text-[#6b3fa0]">
                    [{String(idx).padStart(2, "0")}] {step.label}
                  </div>
                  <pre className="whitespace-pre text-[#3d2a4a]">
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
  )
}