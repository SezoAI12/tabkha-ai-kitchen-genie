
import React from 'react';
import { cn } from '@/lib/utils';

// Design System Components for consistent UI across the app

// Typography Components
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-4xl md:text-5xl font-bold text-wasfah-deep-teal leading-tight tracking-tight",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn(
        "text-2xl md:text-3xl font-semibold text-wasfah-deep-teal leading-tight",
        className
      )} 
      {...props}
    >
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        "text-xl md:text-2xl font-medium text-wasfah-deep-teal",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-gray-600 leading-relaxed",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span 
      className={cn(
        "text-sm text-gray-500",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  )
};

// Enhanced Card Component
export const EnhancedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}> = ({ 
  children, 
  className, 
  variant = 'default', 
  hover = true,
  onClick 
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border-0 shadow-lg',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-wasfah-light-gray border-0 shadow-md'
  };

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300',
        variantStyles[variant],
        hover && 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Icon Container
export const IconContainer: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className 
}) => {
  const variantStyles = {
    primary: 'bg-wasfah-bright-teal/10 text-wasfah-bright-teal',
    secondary: 'bg-gray-100 text-gray-600',
    accent: 'bg-wasfah-mint/20 text-wasfah-teal',
    danger: 'bg-wasfah-coral-red/10 text-wasfah-coral-red'
  };

  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
};

// Progress Indicator
export const ProgressIndicator: React.FC<{
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: 'primary' | 'success' | 'warning';
  className?: string;
}> = ({ 
  value, 
  max = 100, 
  showLabel = false, 
  variant = 'primary',
  className 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantStyles = {
    primary: 'bg-wasfah-bright-teal',
    success: 'bg-green-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-700 ease-out rounded-full',
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

// Animated Badge
export const AnimatedBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  pulse?: boolean;
  className?: string;
}> = ({ 
  children, 
  variant = 'default', 
  pulse = false,
  className 
}) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variantStyles[variant],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
};

// Layout Container
export const LayoutContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}> = ({ 
  children, 
  className, 
  maxWidth = 'lg',
  padding = true 
}) => {
  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full'
  };

  return (
    <div
      className={cn(
        'mx-auto',
        maxWidthStyles[maxWidth],
        padding && 'px-4 py-6',
        className
      )}
    >
      {children}
    </div>
  );
};
