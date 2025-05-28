
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  gradient = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: gradient 
      ? 'bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white focus:ring-wasfah-bright-teal shadow-lg'
      : 'bg-wasfah-bright-teal hover:bg-wasfah-teal text-white focus:ring-wasfah-bright-teal shadow-md',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white focus:ring-wasfah-bright-teal',
    ghost: 'text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10 focus:ring-wasfah-bright-teal',
    danger: 'bg-wasfah-coral-red hover:bg-red-600 text-white focus:ring-wasfah-coral-red shadow-md',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-md'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };

  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  return (
    <Button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        'hover:scale-105 active:scale-95',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={cn('animate-spin', iconSizeStyles[size], children && 'mr-2')} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={cn(iconSizeStyles[size], children && 'mr-2')}>
          {icon}
        </span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={cn(iconSizeStyles[size], children && 'ml-2')}>
          {icon}
        </span>
      )}
    </Button>
  );
};
