'use client';
import { motion, useReducedMotion } from 'motion/react';
import { uiSpring } from '@/lib/motion';
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: reduced ? 1 : .75 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : uiSpring}>{children}</motion.div>;
}
