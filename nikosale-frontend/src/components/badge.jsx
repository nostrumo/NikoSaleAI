import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full';

  const variants = {
    default: 'bg-blue-600 text-white',
    outline: 'border border-border text-muted-foreground bg-transparent',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};
