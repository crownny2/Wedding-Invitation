/**
 * A small hand-drawn curling vine, used as a corner accent on the bordered
 * cards across Countdown, Details, Entourage, and Gift. Pass `flip` to mirror
 * it for the opposite (right) corner — done by transforming the path data
 * inside the SVG's own coordinate space rather than a CSS transform, since a
 * CSS `scaleX(-1)` on an SVG can mirror around the wrong origin depending on
 * the browser's transform-box handling.
 */
export default function VineFlourish({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className={className}
    >
      <g transform={flip ? "translate(60,0) scale(-1,1)" : undefined}>
        <path d="M2 58C2 38 11 22 30 14" />
        <path d="M30 14c-2.5 4-1 8.5 3.5 9.5" />
        <path d="M21 27c3.5 2 8 .5 9-4" />
        <path d="M12 40c3.5 1.5 7.5-.2 8.5-4" />
      </g>
    </svg>
  );
}
