import React from 'react';
import { motion, Variants } from 'framer-motion';

type DoodleType = 'arrow-curved' | 'circle' | 'underline' | 'star' | 'squiggle';

interface DoodleProps {
  type: DoodleType;
  className?: string;
  color?: string;
  delay?: number;
}

export const Doodle: React.FC<DoodleProps> = ({ 
  type, 
  className = "", 
  color = "currentColor",
  delay = 0 
}) => {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    }
  };

  const svgs = {
    'arrow-curved': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M10 50 C 30 20, 70 20, 90 60"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
        />
        <motion.path
          d="M70 55 L 90 60 L 85 40"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </svg>
    ),
    'circle': (
      <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M10,50 Q10,10 100,10 Q190,10 190,50 Q190,90 100,90 Q10,90 10,50 Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 5"
          variants={draw}
        />
      </svg>
    ),
    'underline': (
      <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <motion.path
          d="M5 10 Q 50 15, 100 5 T 195 10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
        />
      </svg>
    ),
    'star': (
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
         <motion.path
          d="M25 5 L 30 20 L 45 20 L 32 30 L 36 45 L 25 35 L 14 45 L 18 30 L 5 20 L 20 20 Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </svg>
    ),
    'squiggle': (
       <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
         <motion.path
          d="M5 15 Q 15 5, 25 15 T 45 15 T 65 15 T 85 15"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
        />
      </svg>
    )
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {svgs[type]}
    </motion.div>
  );
};