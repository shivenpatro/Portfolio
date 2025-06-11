"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

type Edge = 'left' | 'right' | 'top' | 'bottom';

const PortfolioSidekick = () => {
  const [edge, setEdge] = useState<Edge>('left');
  const [isIdle, setIsIdle] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const idleTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), 2000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    idleTimer.current = setTimeout(() => setIsIdle(true), 2000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Animate out
      setTimeout(() => {
        const edges: Edge[] = ['left', 'right', 'top', 'bottom'];
        let newEdge = edges[Math.floor(Math.random() * edges.length)];
        while (newEdge === edge) {
          newEdge = edges[Math.floor(Math.random() * edges.length)];
        }
        setEdge(newEdge);
        setIsVisible(true); // Animate in
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, [edge]);

  const pupilX = useTransform(springMouseX, [0, windowSize.width], [-6, 6]);
  const pupilY = useTransform(springMouseY, [0, windowSize.height], [-6, 6]);

  const getEdgePosition = () => {
    const variants = {
      left: { left: -35, top: '50%', y: '-50%', right: 'auto', bottom: 'auto', rotate: 0 },
      right: { right: -35, top: '50%', y: '-50%', left: 'auto', bottom: 'auto', rotate: 180 },
      top: { top: -35, left: '50%', x: '-50%', bottom: 'auto', right: 'auto', rotate: 90 },
      bottom: { bottom: -35, left: '50%', x: '-50%', top: 'auto', right: 'auto', rotate: -90 },
    };
    return variants[edge];
  };

  const containerVariants = {
    hidden: (edge: Edge) => {
      if (edge === 'left') return { x: '-100%', opacity: 0 };
      if (edge === 'right') return { x: '100%', opacity: 0 };
      if (edge === 'top') return { y: '-100%', opacity: 0 };
      return { y: '100%', opacity: 0 };
    },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  const duckAnimation = {
    hidden: { y: 20, opacity: 0.5, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[1000] w-[70px] h-[70px]"
          style={getEdgePosition()}
          custom={edge}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Antenna */}
            <motion.line x1="50" y1="15" x2="50" y2="0" stroke="#34d399" strokeWidth="3" />
            <motion.circle cx="50" cy="15" r="5" fill="#34d399" />
            
            {/* Head */}
            <motion.g variants={duckAnimation} animate={isIdle ? 'hidden' : 'visible'} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
              <path d="M20 40 C20 15, 80 15, 80 40 Z" fill="url(#paint0_linear_1_2)" />
              <rect x="20" y="40" width="60" height="40" fill="url(#paint0_linear_1_2)" rx="10" />
              
              {/* Eye */}
              <circle cx="50" cy="55" r="18" fill="white" />
              <motion.circle cx="50" cy="55" r="8" fill="black" style={{ x: pupilX, y: pupilY }} />
            </motion.g>

            <defs>
              <linearGradient id="paint0_linear_1_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioSidekick;
