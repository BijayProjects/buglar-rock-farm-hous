import React from 'react';
import { motion } from 'motion/react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const initialY = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
