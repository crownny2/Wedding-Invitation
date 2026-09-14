export default function RSVPProgress({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2.5">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            n === step ? "w-7 bg-wine" : "w-1.5 bg-olive-dark/20"
          }`}
        />
      ))}
    </div>
  );
}
