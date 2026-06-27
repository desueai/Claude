export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    neutral: 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)]',
    leadership: 'bg-[var(--color-leadership-light)] text-[var(--color-leadership)]',
    pm: 'bg-[var(--color-pm-light)] text-[#92400E]',
    specialist: 'bg-[var(--color-specialist-light)] text-[var(--color-specialist)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    error: 'bg-[var(--color-error-light)] text-[var(--color-error)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
