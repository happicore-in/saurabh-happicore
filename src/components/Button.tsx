import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  asAnchor?: boolean;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon = false,
  asAnchor = false,
  href,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-4 py-2 text-[12px]',
    lg: 'px-6 py-3 text-[14px]',
  }[size];

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    bg-[#E8EEF7] text-[#050505] font-mono uppercase tracking-[0.08em] font-semibold
    rounded-[4px] transition-all duration-200 ease-out
    hover:bg-[#FFFFFF] hover:shadow-[0_0_20px_rgba(232,238,247,0.15)] active:scale-[0.98]
    cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#8FB8E8]
    ${sizeStyles} ${className}
  `.trim();

  if (asAnchor && href) {
    return (
      <a href={href} className={baseStyles}>
        <span>{children}</span>
        {icon && <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="w-3.5 h-3.5" />}
    </button>
  );
};

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  asAnchor?: boolean;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon = false,
  asAnchor = false,
  href,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-4 py-2 text-[12px]',
    lg: 'px-6 py-3 text-[14px]',
  }[size];

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    bg-[#080808] text-[#F2F4F7] font-mono uppercase tracking-[0.08em] font-medium
    border border-[#2A2E35] rounded-[4px] transition-all duration-200 ease-out
    hover:bg-[#111111] hover:border-[#8FB8E8]/60 hover:text-[#FFFFFF] active:scale-[0.98]
    cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#8FB8E8]
    ${sizeStyles} ${className}
  `.trim();

  if (asAnchor && href) {
    return (
      <a href={href} className={baseStyles}>
        <span>{children}</span>
        {icon && <ArrowUpRight className="w-3.5 h-3.5" />}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="w-3.5 h-3.5" />}
    </button>
  );
};

interface TextArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  href?: string;
  className?: string;
  external?: boolean;
}

export const TextArrowLink: React.FC<TextArrowLinkProps> = ({
  label,
  href = '#',
  className = '',
  external = false,
  ...props
}) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`
        group inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.08em]
        text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors duration-200
        focus:outline-none cursor-pointer ${className}
      `.trim()}
      {...props}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
    </a>
  );
};
