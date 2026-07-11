'use client'

import { EXAMPLES } from "@/src/types/type";
import { useEffect, useRef, useState } from "react"
import MatrixMascot from "../MatrixMascot";
import { baloo, mono, nunito } from "@/src/lib/font";

type Offset = { x: number; y: number };

export default function HeroSection() {
  const [step, setStep] = useState<0 | 1>(0);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flip = setInterval(() => {
      setStep((s) => {
        if (s === 1) {
          setExampleIdx((i) => (i + 1) % EXAMPLES.length);
          return 0;
        }
        return 1;
      })
    }, 1800);
    return () => clearInterval(flip);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x, y })
  }

  const current = EXAMPLES[exampleIdx];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#eaf3fb_0%,#e9eefb_55%,#eaf3fb_100%)] ${nunito.className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#cdbdf0] opacity-60 blur-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * 18}px, ${offset.y * 18}px)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-24 top-40 h-24 w-24 rounded-full bg-[#a8ddd0] opacity-70 blur-[20px] animate-[floatY_5s_ease-in-out_infinite] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * -12}px, ${offset.y * -12}px)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-16 h-20 w-20 rounded-full bg-[#b8d4f2] opacity-60 blur-[18px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * 10}px, ${offset.y * 10}px)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <nav className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#4a90d9,#2472a4)] text-sm font-bold text-white">
              M⁻¹
            </div>
            <span className="font-semibold text-[#4a2e5c]">
              matrix, solved
            </span>
          </div>

          <a href="#calculator"
            className="text-sm font-medium px-4 py-2 rounded-full bg-white/70 backdrop-blur transition-colors hover:bg-white text-[#6b4478]"
          >
            Matrix Inverse Project
          </a>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 items-center pt-16 pb-24">
          <div>
            <span
              className=" fade-in-1 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-6 bg-[#fbe8a6] text-[#8a5a10]"
            >
              Linear algebra, made friendly
            </span>
            <h1
              className={`fade-in-2 mb-6 font-bold leading-[1.05] text-[clamp(2.4rem,5vw,3.75rem)] text-[#3d2a4a] ${baloo.className}`}
            >
              Let&apos;s find your {" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 h-3 rounded-sm bg-[#cfe4f7]"
                  aria-hidden
                />
                <span className="relative text-[#2f6fb0]">
                  matrix inverse
                </span>
              </span>
              , together!
            </h1>

            <p 
              className="fade-in-3 text-base sm:text-lg leading-relaxed mb-8 max-w-md text-[#6b5876]"
            >
              An inverse matrix undoes what the original one does - the key to solving system of equations, transformations, and more. Type in any square matrix and watch it get solved step by step, from 2x2 up through 6x6
            </p>
            <a
              href="#calculator"
              className="cta-btn fade-in-4 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#4a90d9,#2f6fb0)] px-6 py-3.5 font-semibold text-white shadow-[0_10px_25px_-8px_rgba(47,111,176,0.55)] transition-transform hover:scale-[1.03]"
            >
              Start calculator
              <span className="cta-arrow" aria-hidden>
                →
              </span>
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <MatrixMascot example={current} step={step} monoClassName={mono.className} />
          </div>
        </div>
      </div>
    </div>
  )
}