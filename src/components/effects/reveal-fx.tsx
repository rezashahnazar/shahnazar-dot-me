"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealFxProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  translateY?: number;
  translateX?: number;
  once?: boolean;
  blur?: boolean;
}

export function RevealFx({
  children,
  className,
  delay = 0,
  duration = 0.6,
  translateY = 20,
  translateX = 0,
  once = true,
  blur = true,
}: RevealFxProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: translateY,
        x: translateX,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      } : {
        opacity: 0,
        y: translateY,
        x: translateX,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface FadeGradientProps {
  position?: "top" | "bottom";
  height?: number;
  className?: string;
}

export function FadeGradient({
  position = "top",
  height = 80,
  className,
}: FadeGradientProps) {
  const gradientDirection = position === "top" ? "to-b" : "to-t";

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40 pointer-events-none",
        position === "top" ? "top-0" : "bottom-0",
        `bg-gradient-${gradientDirection} from-background to-transparent`,
        className
      )}
      style={{ height }}
    />
  );
}
