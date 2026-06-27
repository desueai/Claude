export function Card({ children, accent, accentColor, className = '', ...props }) {
  return (
    <div
      className={`bg-white border border-[var(--color-gray-200)] rounded-xl p-6 transition-shadow duration-200 hover:shadow-md ${className}`}
      style={accent && accentColor ? { borderTop: `3px solid ${accentColor}` } : {}}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardSoft({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
