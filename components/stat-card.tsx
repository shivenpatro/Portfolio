"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function StatCard({ 
  icon, 
  value, 
  label, 
  suffix = "", 
  duration = 2, 
  delay = 0,
  decimals = 0
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    const startTimestamp = performance.now() + delay;

    const easing = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)); // easeOutExpo

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTimestamp;
      if (elapsedTime < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const easedProgress = easing(progress);
      const currentCount = easedProgress * value;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure it ends on the exact value
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animationFrame);
    }
  }, [value, duration, isInView, delay, decimals]);

  const formatNumber = (num: number) => {
    const fixedNum = num.toFixed(decimals);
    if (decimals > 0 && parseFloat(fixedNum) % 1 !== 0) {
        return fixedNum;
    }
    return Math.floor(num).toString();
  }

  return (
    <div className="group relative" ref={ref}>
      {/* Animated dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      
      {/* Main card */}
      <div className="relative h-40 w-64 bg-background border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Corner lines */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              {icon}
            </div>
          </div>
          
          {/* Value */}
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {formatNumber(count)}{suffix}
            </div>
            
            {/* Label */}
            <div className="text-sm text-muted-foreground font-medium">
              {label}
            </div>
          </div>
        </div>
        
        {/* Animated background blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
}
