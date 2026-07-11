export default function ConceptSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-4 pb-20">
      <span
        className="inline-block text-xs font-bold tracking-wide px-3 py-1 rounded-full mb-4 bg-[#dbe9f7] text-[#1f5a8f]"
      >
        CONCEPT
      </span>
      <h2 className="mb-8 flex items-center gap-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#3d2a4a]">
        What&apos;s a matrix inverse? <span aria-hidden>🤔</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <div className="relative rounded-2xl border border-[#ede8f2] bg-white p-6 shadow-[0_2px_10px_rgba(61,42,74,0.06)] sm:p-7">
          <span
            className="absolute -top-3 right-6 text-xs font-semibold px-3 py-1 rounded-full bg-[#d7f0e6] text-[#1f7a5c]"
          >
            good to know
          </span>

          <p className="text-sm sm:text-base leading-relaxed mb-4 text-[#5a4c63]">
            For a square matrix A, its inverse — written A⁻¹ — is the matrix that undoes
            A. Multiply them together in either order and you get back the identity
            matrix, the matrix equivalent of the number 1.
          </p>

          <ul className="space-y-3">
            <li className="flex gap-2 text-sm sm:text-base text-[#4a3d54]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#2f6fb0]" />
              <span className="font-mono">A · A⁻¹ = A⁻¹ · A = I</span>
            </li>
            <li className="flex gap-2 text-sm sm:text-base" style={{ color: "#4a3d54" }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#2f6fb0]" />
              <span>
                A matrix only has an inverse if its determinant is nonzero{" "}
                <span className="font-mono">(det(A) ≠ 0)</span>.
              </span>
            </li>
            <li className="flex gap-2 text-sm sm:text-base text-[#4a3d54]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#2f6fb0]" />
              <span>
                If <span className="font-mono">det(A) = 0</span>, the matrix is called{" "}
                <strong>singular</strong> — it has no inverse.
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col rounded-2xl border border-[#ede8f2] bg-white p-6 shadow-[0_2px_10px_rgba(61,42,74,0.06)] sm:p-7">
          <p className="text-sm sm:text-base font-semibold mb-4 text-[#3d2a4a]">
            The formula for a 2×2 matrix
          </p>

          <div
            className="rounded-xl flex-1 flex items-center justify-center px-4 py-8 bg-[#ece4f7]"
          >
            <div className="flex items-center gap-3 font-mono flex-wrap justify-center text-[#3d2a4a]">
              <span className="text-lg sm:text-xl font-semibold">A⁻¹ =</span>

              <span className="flex flex-col items-center text-base sm:text-lg leading-none">
                <span className="pb-1">1</span>
                <span className="border-t w-full border-[#3d2a4a]" />
                <span className="pt-1">det(A)</span>
              </span>

              <span className="flex items-stretch">
                <span
                  aria-hidden
                  className="w-2 border-l-2 border-t-2 border-[#3d2a4a]"
                />
                <span className="grid grid-cols-2 gap-x-3 gap-y-1 px-2 items-center text-base sm:text-lg">
                  <span className="text-center">d</span>
                  <span className="text-center">-b</span>
                  <span className="text-center">-c</span>
                  <span className="text-center">a</span>
                </span>
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 border-r-2 border-t-2 border-b-2 border-[#3d2a4a]"
                />
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm mt-4 font-mono text-[#8a7b92]">
            where A = [a b; c d] and det(A) = ad − bc
          </p>
        </div>
      </div>
    </section>
  );
}