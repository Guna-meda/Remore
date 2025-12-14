import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = "", 
  direction = 'up' 
}) => {
  const directionOffset = {
    up: 40,
    down: -40,
    left: 40,
    right: -40
  };

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: directionOffset[direction] }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};