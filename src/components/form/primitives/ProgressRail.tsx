export default function ProgressRail({ pct }: { pct: number }) {
  return (
    <div className="progress-rail">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
