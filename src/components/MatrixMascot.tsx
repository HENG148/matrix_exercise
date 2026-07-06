import { MatrixExample } from '../types/type'

type MatrixMascotProps = {
  example: MatrixExample;
  step: 0 | 1;
  monoClassName: string;
}

export default function MatrixMascot({ example, step, monoClassName }: MatrixMascotProps) {
  const grid = step === 0 ? example.m : example.inv;
  const label = step === 0 ? "A" : "A⁻¹";
  return (
    <div
      className='relative flex flex-col items-center'
      style={{ animation: "floatY 6s ease-in-out infinite"}}
    >
      <svg
        viewBox='0 0 400 400'
        width="320"
        height="320"
        role='img'
        aria-label='A cheerful cartoon mascot shaped like matric with a smiling face, live-solving a small matrix'
      >
        <title>Matrix bracket mascot</title>
        <circle cx="330" cy="150" r="26" fill='#a8ddd0' opacity="0.7" />
        <circle cx="70" cy="290" r="18" fill='#f2b8cf' opacity="0.7" />

        <path
          d="M200 60 L206 76 L222 82 L206 88 L200 104 L194 88 L178 82 L194 76 Z"
          fill="#6b3fa0"
          style={{
            transformOrigin: "200px 82px",
            animation: "sparklePulse 2.4s ease-in-out infinite",
          }}
        />

        <path
          d="M120 90 L70 90 L70 310 L120 310"
          fill="none"
          stroke="#6b3fa0"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M280 90 L330 90 L330 310 L280 310"
          fill="none"
          stroke="#6b3fa0"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g key={`${label}-${grid.flat().join(",")}`}>
          {grid.map((row, r) =>
            row.map((val, c) => (
              <text
                key={`${r}-${c}`}
                x={168 + c * 65}
                y={158 + r * 55}
                textAnchor="middle"
                className={`matrix-cell ${monoClassName}`}
                fontSize="26"
                fontWeight={700}
                fill="#3d2a4a"
                style={{ animationDelay: `${(r * 2 + c) * 0.06}s` }}
              >
                {val}
              </text>
            ))
          )}
        </g>
 
        <circle cx="145" cy="255" r="9" fill="#3d2a4a" />
        <circle cx="255" cy="255" r="9" fill="#3d2a4a" />
        <circle cx="128" cy="278" r="10" fill="#f2b8cf" opacity="0.8" />
        <circle cx="272" cy="278" r="10" fill="#f2b8cf" opacity="0.8" />
        <path
          d="M170 284 Q200 306 230 284"
          fill="none"
          stroke="#3d2a4a"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      <div className={`flex items-center gap-3 -mt-3 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-sm font-medium shadow-sm ${monoClassName} text-[#6b4478]`}>
        <span className='px-2 py-0.5 rounded-full text-white text-xs font-bold'
          style={{
            background: step === 0 ? "#6b3fa0" : "#d6497a",
            transition: "background 0.4s ease",
          }}
        >
          {label}
        </span>
        <span>det(A) = {example.det}</span>
      </div>
    </div>
  )
}
