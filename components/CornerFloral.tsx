type Position = "tl" | "tr" | "bl" | "br";

const ANCHOR: Record<Position, string> = {
  tl: "top left",
  tr: "top right",
  bl: "bottom left",
  br: "bottom right",
};

/**
 * The same rose-corner crop (from hero-bg.jpg) used behind every card
 * section below the hero — Countdown, Details, Entourage, Gift. Kept as a
 * single shared component so the zoom/fade/size stay identical across
 * sections; only the vertical offset (which card corner it lines up with)
 * varies per usage.
 */
export default function CornerFloral({
  position,
  top,
  bottom,
}: {
  position: Position;
  /** Tailwind top-offset classes, used for "tl"/"tr". Default aligns to a section with no header above its card. */
  top?: string;
  /** Tailwind bottom-offset classes, used for "bl"/"br". */
  bottom?: string;
}) {
  const anchor = ANCHOR[position];
  const side = position === "tl" || position === "bl" ? "left-0" : "right-0";
  const vertical =
    position === "tl" || position === "tr"
      ? top ?? "top-16 sm:top-20"
      : bottom ?? "bottom-16 sm:bottom-20";
  const mask = `radial-gradient(circle at ${anchor}, black 32%, transparent 58%)`;

  return (
    <div
      className={`pointer-events-none absolute ${side} ${vertical} h-40 w-40 opacity-90 sm:h-56 sm:w-56 lg:h-[280px] lg:w-[280px]`}
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundPosition: anchor,
        backgroundSize: "1500px auto",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
