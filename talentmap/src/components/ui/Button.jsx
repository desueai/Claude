'use client';

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 cursor-pointer border-0';

  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.98]',
    secondary: 'bg-transparent text-[var(--color-gray-800)] border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] hover:border-[var(--color-gray-400)]',
    ghost: 'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]',
    outline: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
