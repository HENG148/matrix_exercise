import Image from "next/image";
import HeroSection from "../components/sections/HeroSection";
import MatrixInversecalculator from "../components/MatrixInversecalculator";
import ConceptSection from "../components/sections/ConceptSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#f7fafd" }}>
      <HeroSection />

      <div style={{ background: "linear-gradient(180deg, #eaf3fb 0%, #f7fafd 100%)" }}>
        <ConceptSection />
      </div>

      <main id="calculator" className="max-w-248 mx-auto px-6 py-16">
        <MatrixInversecalculator />
      </main>

      <footer className="max-w-3xl mx-auto px-6 pb-16"> 
        <p className="font-mono text-xs" style={{ color: "var(--line)" }}>
          Computation runs entirely in your browser - nothing is sent anywhere.
        </p>
      </footer>
    </div>
  );
}
