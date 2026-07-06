import { Baloo_2, JetBrains_Mono, Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"], weight: ["400", "600", "700"]
})

export const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"]
})

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"]
})