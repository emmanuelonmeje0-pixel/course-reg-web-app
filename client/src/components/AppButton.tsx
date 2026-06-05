import React from 'react';
import { cn } from '../components/lib/utils';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const AppButton = ({ 
  variant = 'primary', 
  children, 
  className, 
  ...props 
}: AppButtonProps) => {
  return (
    <button
      className={cn(
        "font-medium px-3 py-2 rounded-full text-white transition duration-200",
        variant === 'primary' 
          ? "bg-black hover:bg-gray-800" 
          : "bg-shapp-green hover:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
