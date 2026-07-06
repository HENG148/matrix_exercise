export default function BracketEdge({ side, tall = false }: { side: "left" | "right"; tall?: boolean}) {
  return (
    <div
      aria-hidden
      style={{
        width: 12,
        borderTop: `3px solid var(--panel)`,
        borderBottom: `3px solid var(--panel)`,
        borderLeft: side === "left" ? `3px solid var(--panel)` : "none",
        borderRight: side === "right" ? `3px solid var(--panel)` : "none",
        margin: tall ? "2px 0" : "10px 0",
      }}
    />
  )
}
