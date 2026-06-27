export function ProgressBar({ value, max = 100, color = 'var(--color-primary)', label, showValue = false, className = '' }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1 text-xs text-[var(--color-gray-600)]">
          {label && <span>{label}</span>}
          {showValue && <span>{pct}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-[var(--color-gray-100)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
