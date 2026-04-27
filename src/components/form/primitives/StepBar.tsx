'use client';

export default function StepBar({
  stepIdx, totalSteps, onPrev, onNext, canGoNext,
  showShortcuts, labels,
}: {
  stepIdx: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  canGoNext: boolean;
  showShortcuts?: boolean;
  labels: { step: string; of: string; back: string; next: string; enterAction: string };
}) {
  return (
    <div className="bottombar">
      <div className="step-meta">
        {labels.step} <b>{String(stepIdx).padStart(2, '0')}</b> {labels.of} <b>{String(totalSteps).padStart(2, '0')}</b>
      </div>
      <div className="bottombar-actions">
        {showShortcuts && stepIdx > 0 && (
          <span className="enter-hint"><kbd>↵</kbd> {labels.enterAction}</span>
        )}
        <div className="nav-arrows">
          <button type="button" onClick={onPrev} disabled={stepIdx === 0} aria-label={labels.back}>↑</button>
          <button type="button" onClick={onNext} disabled={!canGoNext} aria-label={labels.next}>↓</button>
        </div>
        <button
          type="button"
          className="cta cta-next"
          onClick={onNext}
          disabled={!canGoNext}
        >
          {labels.next} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
