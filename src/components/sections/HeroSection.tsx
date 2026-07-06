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
      className={`relative overflow-hidden ${nunito.className}`}
      style={{
        background: "linear-gradient(135deg, #fdeaf0 0%, #f3ecf9 55%, #fdeaf0 100%)"
      }}
    >
      <div aria-hidden
        className="absolute -left-16 top-10 w-56 h-56 rounded-full opacity-60 pointer-events-none"
        style={{
          background: "#cdbdf0",
          filter: "blue(40px)",
          transform: `translate(${offset.x * 18}px, ${offset.y * 18}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        aria-hidden
        className="absolute right-24 top-40 w-24 h-24 rounded-full opacity-70 pointer-events-none"
        style={{
          background: "#a8ddd0",
          filter: "blur(20px)",
          animation: "floatY 5s ease-in-out infinite",
          transform: `translate(${offset.x * -12}px, ${offset.y * -12}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        aria-hidden
        className="absolute left-16 bottom-0 w-20 h-20 rounded-full opacity-60 pointer-events-none"
        style={{
          background: "#f2b8cf",
          filter: "blur(18px)",
          transform: `translate(${offset.x * 10}px, ${offset.y * 10}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <nav className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{
              background: "linear-gradient(135deg, #e75480, #c9457a)"
              }}
            >
              M⁻¹
            </div>
            <span className="font-semibold" style={{ color: "#4a2e5c" }}>
              matrix, solved
            </span>
          </div>

          <a href="#calculator"
            className="text-sm font-medium px-4 py-2 rounded-full bg-white/70 backdrop-blur transition-colors hover:bg-white"
            style={{ color: "#6b4478" }}
          >
            Matrix Inverse Project
          </a>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 items-center pt-16 pb-24">
          <div>
            <span
              className=" fade-in-1 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-6"
              style={{ background: "#fbe8a6", color: "#8a5a10" }}
            >
              Linear algebra, made friendly
            </span>
            <h1 
              className={`fade-in-2 font-bold leading-[1.05] mb-6 ${baloo.className}`}
              style={{
                color: "#3d2a4a",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              }}
            >
              Let&apos;s find your {" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 h-3 rounded-sm bg-[#f7c3d6]"
                  aria-hidden
                />
                <span className="relative text-[#d6497a]">
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
              className="cta-btn fade-in-4 inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-white transition-transform hover:scale-[1.03] shadow-lg"
              style={{
                background: "linear-gradient(135deg, #ea5d8a, #d6497a)",
                boxShadow: "0 10px 25px -8px rgba(214, 73, 122, 0.55)",
              }}>
              Start calculator
              <span className="cta-arrow" aria-hidden>→</span>
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