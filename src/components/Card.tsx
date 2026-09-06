import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'elevated';
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'primary',
  className = '',
  hoverable = true,
  padding = 'md',
  ...props
}) => {
  const bgStyles = {
    primary: 'bg-[#080808]',
    secondary: 'bg-[#0D0D0D]',
    elevated: 'bg-[#111111]',
  }[variant];

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const hoverStyles = hoverable
    ? 'transition-all duration-200 ease-out hover:border-[#2A2E35] hover:bg-[#0D0D0D]'
    : '';

  return (
    <div
      className={`
        relative rounded-[8px] border border-[#22252A]
        ${bgStyles} ${paddingStyles} ${hoverStyles} ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title?: string;
  meta?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ title, meta, children, className = '' }) => (
  <div className={`flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[#17191D] ${className}`}>
    {meta && <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6F7682]">{meta}</span>}
    {title && <h3 className="font-heading text-lg font-medium text-[#F2F4F7] uppercase tracking-wide">{title}</h3>}
    {children}
  </div>
);
