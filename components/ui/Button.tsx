import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 focus:ring-blue-500",
    secondary: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md focus:ring-slate-200",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};