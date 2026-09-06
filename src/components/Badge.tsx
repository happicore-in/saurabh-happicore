import React from 'react';
import { BadgeVariant } from '../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    warm: {
      container: 'border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623]',
      dot: 'bg-[#F5A623]',
    },
    blue: {
      container: 'border-[#8FB8E8]/30 bg-[#8FB8E8]/10 text-[#8FB8E8]',
      dot: 'bg-[#8FB8E8]',
    },
    neutral: {
      container: 'border-[#22252A] bg-[#0D0D0D] text-[#A7ADB7]',
      dot: 'bg-[#6F7682]',
    },
    outline: {
      container: 'border-[#22252A] bg-transparent text-[#6F7682]',
      dot: 'bg-[#6F7682]',
    },
  };

  const current = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px]
        font-mono text-[11px] uppercase tracking-[0.08em] font-medium border
        select-none ${current.container} ${className}
      `.trim()}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${current.dot} shrink-0 animate-pulse`} />}
      <span>{children}</span>
    </span>
  );
};
