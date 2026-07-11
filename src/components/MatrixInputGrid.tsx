import BracketEdge from "./BracketEdge";

type Props = {
  n: number;
  cells: string[][];
  canCompute: boolean;
  error: string | null;
  onChangeSize: (next: number) => void;
  onSetCell: (i: number, j: number, value: string) => void;
  onRandomize: () => void;
  onClear: () => void;
  onCompute: () => void;
}

const SIZES = [2, 3, 4, 5, 6];

export function MatrixInputGrid({ n, cells, canCompute, error, onChangeSize, onSetCell, onRandomize, onClear, onCompute }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(61,42,74,0.10)] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onChangeSize(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                s === n
                  ? "bg-[#2f6fb0] text-white"
                  : "border border-[#e8dde8] bg-white text-[#7a6a83]"
              }`}
            >
              matrix {s}×{s}
            </button>
          ))}
        </div>
 
        <div className="flex items-center gap-4">
          <button
            onClick={onRandomize}
            className="font-semibold text-sm px-4 py-2.5 rounded-full text-white flex items-center gap-2 bg-[#1e3a5f]"
          >
            <span aria-hidden></span> randomize
          </button>
          <button
            onClick={onClear}
            className="font-mono text-xs underline decoration-dotted text-[#7a6a83]"
          >
            clear
          </button>
        </div>
      </div>
 
      <div className="flex items-stretch justify-center gap-0 overflow-x-auto py-2">
        <BracketEdge side="left" />
        <div
          className={`grid gap-3 p-4 ${
            n === 3
              ? "grid-cols-[repeat(3,minmax(56px,64px))]"
              : n === 4
              ? "grid-cols-[repeat(4,minmax(56px,64px))]"
              : "grid-cols-[repeat(5,minmax(56px,64px))]"
          }`}
        >
          {cells.map((row, i) =>
            row.map((val, j) => (
              <input
                key={`${i}-${j}`}
                value={val}
                onChange={(e) => onSetCell(i, j, e.target.value)}
                onFocus={(e) => e.target.select()}
                inputMode="text"
                aria-label={`a${i + 1}${j + 1}`}
                className="h-12 w-full rounded-xl border-2 border-[#c9def2] bg-[#eaf3fb] text-center font-mono text-base font-semibold text-[#3d2a4a] outline-none transition-colors hover:border-[#8fb8e0] focus:border-[#2f6fb0]"
              />
            ))
          )}
        </div>
        <BracketEdge side="right" />
      </div>
 
      <div className="flex flex-col items-center mt-8">
        <button
          onClick={onCompute}
          disabled={!canCompute}
          className="font-semibold text-base px-8 py-3.5 rounded-full text-white transition-opacity disabled:opacity-40 flex items-center gap-2 bg-[#1e3a5f]"
        >
          <span aria-hidden></span> compute inverse
        </button>
        {!canCompute && (
          <span className="font-mono text-xs mt-3 text-[#7a6a83]">
            fill in every cell first
          </span>
        )}
        {error && (
          <p className="font-mono text-sm mt-3 text-[#c0392b]">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}