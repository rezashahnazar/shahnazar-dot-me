"use client";

import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  className?: string;
  mask?: {
    x?: number;
    y?: number;
    radius?: number;
  };
  gradient?: {
    display?: boolean;
    opacity?: number;
    x?: number;
    y?: number;
    colorStart?: string;
    colorEnd?: string;
  };
  dots?: {
    display?: boolean;
    opacity?: number;
    size?: number;
    color?: string;
  };
  grid?: {
    display?: boolean;
    opacity?: number;
    color?: string;
    width?: string;
    height?: string;
  };
  lines?: {
    display?: boolean;
    opacity?: number;
    color?: string;
    angle?: number;
  };
  noise?: {
    display?: boolean;
    opacity?: number;
  };
}

export function BackgroundEffects({
  className,
  mask = { x: 50, y: 0, radius: 100 },
  gradient = { display: true, opacity: 60, x: 50, y: 50, colorStart: "hsl(var(--primary))", colorEnd: "transparent" },
  dots = { display: true, opacity: 30, size: 1, color: "hsl(var(--primary))" },
  grid = { display: false, opacity: 20, color: "hsl(var(--muted-foreground))", width: "40px", height: "40px" },
  lines = { display: false, opacity: 15, color: "hsl(var(--muted-foreground))", angle: -45 },
  noise = { display: true, opacity: 3 },
}: BackgroundEffectsProps) {
  const maskStyle = {
    maskImage: `radial-gradient(ellipse ${mask.radius}% ${mask.radius}% at ${mask.x}% ${mask.y}%, black, transparent)`,
    WebkitMaskImage: `radial-gradient(ellipse ${mask.radius}% ${mask.radius}% at ${mask.x}% ${mask.y}%, black, transparent)`,
  };

  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {gradient.display && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            ...maskStyle,
            background: `radial-gradient(ellipse 80% 60% at ${gradient.x}% ${gradient.y}%, ${gradient.colorStart}, ${gradient.colorEnd})`,
            opacity: gradient.opacity / 100,
          }}
        />
      )}

      {dots.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `radial-gradient(${dots.color} ${dots.size}px, transparent ${dots.size}px)`,
            backgroundSize: `${dots.size * 16}px ${dots.size * 16}px`,
            opacity: dots.opacity / 100,
          }}
        />
      )}

      {grid.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `
              linear-gradient(${grid.color} 1px, transparent 1px),
              linear-gradient(90deg, ${grid.color} 1px, transparent 1px)
            `,
            backgroundSize: `${grid.width} ${grid.height}`,
            opacity: grid.opacity / 100,
          }}
        />
      )}

      {lines.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `repeating-linear-gradient(
              ${lines.angle}deg,
              transparent,
              transparent 10px,
              ${lines.color} 10px,
              ${lines.color} 11px
            )`,
            opacity: lines.opacity / 100,
          }}
        />
      )}

      {noise.display && (
        <div
          className="absolute inset-0 bg-noise animate-subtle-drift"
          style={{
            opacity: noise.opacity / 100,
          }}
        />
      )}

      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
    </div>
  );
}

